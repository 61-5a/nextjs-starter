import Image from "next/image";
import { Inter } from "next/font/google";

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
      {/* <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <Image className={styles.logo} src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
        <h1 className="text-3xl font-bold underline pt-10 pl-10">{test}</h1>
        <h2 className={inter.className}>Templates</h2>
        <div className={`container ${styles.container} ${styles.test}`}>
          {desktop ? "Desktop" : ""}
          {mobile ? "Mobile" : ""}
        </div>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <a href="#" className="" target="_blank" rel="noopener noreferrer">
            a
          </a>
        </div>
      </main> */}
      404
    </>
  );
}
