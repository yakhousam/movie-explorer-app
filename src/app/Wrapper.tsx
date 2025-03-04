"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <ReactQueryDevtools buttonPosition="bottom-right" />
        {children}
      </>
    </QueryClientProvider>
  );
};

export default Wrapper;
