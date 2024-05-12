import Link from "next/link";

export default function NotFound() {
  return (
    <>
      Not Found - no URL - go to <Link href={"/"}>Home</Link>
    </>
  );
}
