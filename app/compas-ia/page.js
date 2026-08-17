import ProductPage from "../components/product-page";
import { products } from "../lib/products";

export const metadata = {
  title: "Compás IA | Agentes inteligentes con función",
  description: products.ia.description,
  alternates: { canonical: "/compas-ia" },
};

export default function Page() {
  return <ProductPage product={products.ia} />;
}
