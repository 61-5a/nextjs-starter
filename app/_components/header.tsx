"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHistoryStore } from "@/app/_store/history";

export default function Header() {
  const pathname = usePathname();
  const setHistory = useHistoryStore((state) => state.setHistory);

  useEffect(() => {
    setHistory(pathname);
  }, [pathname, setHistory]);

  const history = useHistoryStore((state) => state.history);
  console.log("header", { history });

  return (
    <>
      <Link href={"/"}>home</Link>
      <br />
      <Link href={"/about"}>about</Link>
      <br />
      <Link href={"/login"}>login</Link>
      <br />
      <br />
    </>
  );
}
