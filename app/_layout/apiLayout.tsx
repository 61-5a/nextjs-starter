"use client";
import React, { useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { StoreContext } from "../_context/storeContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

export default function ApiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const Store = useContext(StoreContext);
  if (!Store) throw new Error("Store is not available in the context.");
  const setHistory: React.Dispatch<React.SetStateAction<string[]>> = Store?.setHistory;

  const pathname = usePathname();
  useEffect(() => {
    setHistory((prevHistory) => {
      let lastHistory = prevHistory[prevHistory.length - 1];
      let secondLastHistory = prevHistory[prevHistory.length - 2] ?? "/";
      if (pathname !== lastHistory) {
        return [secondLastHistory, lastHistory, pathname];
      } else {
        return prevHistory;
      }
    });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
