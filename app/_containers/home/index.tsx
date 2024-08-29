"use client";
import { useQuery } from "@tanstack/react-query";
import useWindowDimensions from "@/app/_hooks/window";
import useUserAgent from "@/app/_hooks/userAgent";

import Header from "@/app/_components/header";
import { useHistoryStore } from "@/app/_store/history";

export default function HomePage() {
  // const history = useHistoryStore((state) => state.history);
  // console.log("home", { history });

  // const { height, width, mobile, desktop } = useWindowDimensions();
  // console.log({ height, width, mobile, desktop });

  // const userAgent = useUserAgent();
  // console.log(userAgent);

  // const fetchData = async () => {
  //   const resp = await fetch(`https://jsonplaceholder.typicode.com/users`, { next: { revalidate: false } });
  //   const data = await resp.json();
  //   return data;
  // };

  // const { data, isLoading } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchData,
  // });
  // console.log({ data, isLoading });

  return (
    <>
      <Header />
      <div>home</div>
    </>
  );
}
