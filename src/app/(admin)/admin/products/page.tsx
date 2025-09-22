import { Suspense } from "react";
import ProductList from "./_components/product-list/product-list";
import Loading from "@/app/_components/loading/loading";

export default async function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductList />
    </Suspense>
  );
}
