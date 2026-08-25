import ProductPage from "../components/product-page";
import { products } from "../lib/products";

export const metadata = {
  title: { absolute: products.academy.seoTitle },
  description: products.academy.seoDescription,
  alternates: { canonical: "/compas-academy" },
  openGraph: {
    title: products.academy.seoTitle,
    description: products.academy.seoDescription,
    url: "https://www.proyectocompas.com/compas-academy",
    siteName: "Compás Evolution",
    images: [{ url: products.academy.ogImage, alt: products.academy.shortName }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: products.academy.seoTitle,
    description: products.academy.seoDescription,
    images: [products.academy.ogImage],
  },
};

export default function Page() {
  return <ProductPage product={products.academy} />;
}
