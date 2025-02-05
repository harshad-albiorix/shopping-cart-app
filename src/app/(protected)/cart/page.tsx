import { getQueryClient } from "@/app/get-query-client";
import { CartContainer } from "@/container";
import { getCartProducts } from "@/lib/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

function CartPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getCartProducts);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartContainer />
    </HydrationBoundary>
  );
}

export default CartPage;
