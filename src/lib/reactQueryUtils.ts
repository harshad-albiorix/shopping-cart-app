
import { QueryClient, DehydratedState, dehydrate } from "@tanstack/react-query";

export async function prefetchQuery<T>(
    queryKey: string[],
    queryFn: () => Promise<T>
): Promise<DehydratedState> {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey, queryFn });
    return dehydrate(queryClient);
}
