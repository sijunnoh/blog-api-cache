"use client"

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 99999999,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: 0,
    },
  },
})

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  )
}
