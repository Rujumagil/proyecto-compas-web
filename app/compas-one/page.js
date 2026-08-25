import ProductPage from "../components/product-page";
import { products } from "../lib/products";

export const metadata = {
  title: { absolute: products.one.seoTitle },
  description: products.one.seoDescription,
  alternates: { canonical: "/compas-one" },
  openGraph: {
    title: products.one.seoTitle,
    description: products.one.seoDescription,
    url: "https://www.proyectocompas.com/compas-one",
    siteName: "Compás Evolution",
    images: [{ url: products.one.ogImage, alt: products.one.shortName }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: products.one.seoTitle,
    description: products.one.seoDescription,
    images: [products.one.ogImage],
  },
};

export default function Page() {
  return <ProductPage product={products.one} />;
}
