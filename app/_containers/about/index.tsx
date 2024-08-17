"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { StoreContext } from "@/app/_context/storeContext";
import { useHistoryStore } from "@/app/_store/history";
import Header from "@/app/_components/header";

export default function AboutPage() {
  const Store = useContext(StoreContext);
  // if (!Store) throw new Error("Store is not available in the context.");
  // const history: string[] = Store.history;
  // const remove: string = Store.remove;
  // console.log({ history, remove });

  const history = useHistoryStore((state) => state.history);
  // console.log({ history });

  console.log("hi");

  return (
    <>
      <Header />
      hi <Link href={"/"}>home</Link>
    </>
  );
}
