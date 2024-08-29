"use client";
import { useHistoryStore } from "@/app/_store/history";
import Header from "@/app/_components/header";

export default function LoginPage() {
  const history = useHistoryStore((state) => state.history);
  console.log("login", { history });

  return (
    <>
      <Header />
      <div>login</div>
    </>
  );
}
