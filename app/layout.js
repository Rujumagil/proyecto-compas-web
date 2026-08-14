import "./globals.css";
import "./logo-official.css";

export const metadata = {
  title: "Proyecto Compás | Decide con dirección",
  description: "Ecosistema de Proyecto Compás: Compás One, Compás Academy, Creators e IA con estrategia y foco humano.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
