import ProductPage from "../components/product-page";
import { products } from "../lib/products";

export const metadata = {
  title: "Compás Academy | Aprendizaje aplicable",
  description: products.academy.description,
  alternates: { canonical: "/compas-academy" },
};

export default function Page() {
  return <ProductPage product={products.academy} />;
}
