import { Product } from "@/types/product.types";
import { useEffect, useState } from "react";
import { getLatestProducts } from "../../services/products";
import TopSection from "../top-section/top-section";
import LatestProductItem from "./latest-product-item";

const LatestProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getLatestProducts().then(({ data }) => {
      if (data) {
        setProducts(data);
      }
    });
  }, []);

  return (
    <div className="box h-full min-h-119 flex-1 p-4">
      <TopSection title="محصولات" href="/admin/products" />
      {products.map((product) => (
        <LatestProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default LatestProductList;
