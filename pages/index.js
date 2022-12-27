import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect, useContext, useRef } from "react";
import { StoreContext } from "../global/StoreContext";
import useWindowDimensions from "../global/window";
import { Inter } from "@next/font/google";

import styles from "./index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { height, width, mobile, desktop } = useWindowDimensions();
  const [Store] = useContext(StoreContext);
  const test = Store.test;

  // console.log(height);
  // console.log(width);
  // console.log("mobile", mobile);
  // console.log("desktop", desktop);
  // console.log(useWindowDimensions());

  return (
    <>
      <Head>
        <title>aZ Starter</title>
        <meta name="description" content="Generated by aZ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
        <h1 className="text-3xl font-bold underline pt-10 pl-10">{test}</h1>
        <h2 className={inter.className}>Templates</h2>
        <div className={`container ${styles.container} ${styles.test}`}>
          {desktop ? "Desktop" : ""}
          {mobile ? "Mobile" : ""}
        </div>
      </main>
    </>
  );
}
