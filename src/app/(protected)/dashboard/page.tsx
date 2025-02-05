import { getQueryClient } from "@/app/get-query-client";
import { HomeContainer } from "@/container";
import { getCartProducts, getProducts } from "@/lib/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

function DashboardPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getProducts);
  void queryClient.prefetchQuery(getCartProducts);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeContainer />
    </HydrationBoundary>
  );
}

export default DashboardPage;
