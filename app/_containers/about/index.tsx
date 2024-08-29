"use client";
import { useHistoryStore } from "@/app/_store/history";
import Header from "@/app/_components/header";

export default function AboutPage() {
  const history = useHistoryStore((state) => state.history);
  console.log("about", { history });

  return (
    <>
      <Header />
      <div>about</div>
    </>
  );
}
