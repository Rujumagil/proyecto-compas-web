import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";

const output = "dist";
const assets = {};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === "server" || entry.name === ".openai") continue;
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      await collect(fullPath);
      continue;
    }

    const urlPath = `/${relative(output, fullPath).split(sep).join("/")}`;
    assets[urlPath] = {
      body: (await readFile(fullPath)).toString("base64"),
      type: mimeTypes[extname(entry.name).toLowerCase()] || "application/octet-stream",
    };
  }
}

await collect(output);
await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");

const worker = `const assets = ${JSON.stringify(assets)};

function decode(base64) {
  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let index = 0; index < raw.length; index += 1) bytes[index] = raw.charCodeAt(index);
  return bytes;
}

function resolveAsset(path) {
  if (path === "/") return "/index.html";

  const candidates = path.endsWith("/")
    ? [path + "index.html", path.slice(0, -1) + ".html"]
    : [path, path + ".html", path + "/index.html"];

  return candidates.find((candidate) => assets[candidate]);
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);
    const resolvedPath = resolveAsset(path);
    const asset = (resolvedPath && assets[resolvedPath]) || assets["/404.html"];
    const status = resolvedPath ? 200 : 404;
    const headers = {
      "content-type": asset.type,
      "x-content-type-options": "nosniff",
      "cache-control": asset.type.startsWith("text/html")
        ? "public, max-age=0, must-revalidate"
        : "public, max-age=31536000, immutable",
    };

    return new Response(decode(asset.body), { status, headers });
  },
};
`;

await writeFile("dist/server/index.js", worker, "utf8");
