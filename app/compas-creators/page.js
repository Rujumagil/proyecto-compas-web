import ProductPage from "../components/product-page";
import { products } from "../lib/products";

export const metadata = {
  title: "Compás Creators | Ideas convertidas en proyectos",
  description: products.creators.description,
  alternates: { canonical: "/compas-creators" },
};

export default function Page() {
  return <ProductPage product={products.creators} />;
}
