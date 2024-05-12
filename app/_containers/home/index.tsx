"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { StoreContext } from "@/app/_context/storeContext";
import { useQuery } from "@tanstack/react-query";
import useWindowDimensions from "@/app/_hooks/window";
import useUserAgent from "@/app/_hooks/userAgent";

export default function HomePage() {
  const Store = useContext(StoreContext);
  if (!Store) throw new Error("Store is not available in the context.");
  const history: string[] = Store.history;
  const remove: string = Store.remove;
  console.log({ history, remove });

  const { height, width, mobile, desktop } = useWindowDimensions();
  console.log({ height, width, mobile, desktop });

  const userAgent = useUserAgent();
  console.log(userAgent);

  const fetchData = async () => {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/users`, { next: { revalidate: false } });
    const data = await resp.json();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });
  console.log({ data, isLoading });

  return (
    <>
      hi
      <Link href={"/about"}>about</Link>
    </>
  );
}
