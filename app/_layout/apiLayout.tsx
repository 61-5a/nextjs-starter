"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { StoreContext } from "../_context/storeContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

let deferredPrompt: any;

import styles from "./apiLayout.module.css";

export default function ApiLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const Store = useContext(StoreContext);
  if (!Store) throw new Error("Store is not available in the context.");
  const setHistory: React.Dispatch<React.SetStateAction<string[]>> = Store?.setHistory;

  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = (e: any) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

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
      {installable && (
        <button onClick={handleInstallClick} className={styles.install_button_footer}>
          <Image src="/icons/download.svg" alt="download" width={40} height={40} title="Download this App" />
        </button>
      )}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
