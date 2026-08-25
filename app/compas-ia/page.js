import ProductPage from "../components/product-page";
import { products } from "../lib/products";

export const metadata = {
  title: { absolute: products.ia.seoTitle },
  description: products.ia.seoDescription,
  alternates: { canonical: "/compas-ia" },
  openGraph: {
    title: products.ia.seoTitle,
    description: products.ia.seoDescription,
    url: "https://www.proyectocompas.com/compas-ia",
    siteName: "Compás Evolution",
    images: [{ url: products.ia.ogImage, alt: products.ia.shortName }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: products.ia.seoTitle,
    description: products.ia.seoDescription,
    images: [products.ia.ogImage],
  },
};

export default function Page() {
  return <ProductPage product={products.ia} />;
}
