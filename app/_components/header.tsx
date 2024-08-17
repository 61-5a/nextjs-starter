"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useHistoryStore } from "@/app/_store/history";

export default function Header() {
  const pathname = usePathname();
  const setHistory = useHistoryStore((state) => state.setHistory);

  useEffect(() => {
    setHistory(pathname);
  }, [pathname]);

  return (
    <>
      <div>Header</div>
    </>
  );
}
