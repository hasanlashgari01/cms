import { Suspense } from "react";
import DiscountList from "./_components/discount-list/discount-list";
import Loading from "@/app/_components/loading/loading";

const DiscountsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DiscountList />;
    </Suspense>
  );
};

export default DiscountsPage;
