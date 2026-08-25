import ProductPage from "../components/product-page";
import { products } from "../lib/products";

export const metadata = {
  title: { absolute: products.creators.seoTitle },
  description: products.creators.seoDescription,
  alternates: { canonical: "/compas-creators" },
  openGraph: {
    title: products.creators.seoTitle,
    description: products.creators.seoDescription,
    url: "https://www.proyectocompas.com/compas-creators",
    siteName: "Compás Evolution",
    images: [{ url: products.creators.ogImage, alt: products.creators.shortName }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: products.creators.seoTitle,
    description: products.creators.seoDescription,
    images: [products.creators.ogImage],
  },
};

export default function Page() {
  return <ProductPage product={products.creators} />;
}
