import ProductPage from "../components/product-page";
import { products } from "../lib/products";

export const metadata = {
  title: "Compás One | Operación inteligente",
  description: products.one.description,
  alternates: { canonical: "/compas-one" },
};

export default function Page() {
  return <ProductPage product={products.one} />;
}
