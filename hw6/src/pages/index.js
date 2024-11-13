import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AirlineRoutes from "@/pages/assignment6_tengis_otgonbaatar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Assignment 6</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <AirlineRoutes />
        <div className={styles.center}>
          <a
            href="https://gist.github.com/hogwild/9367e694e12bd2616205e4b3e91285d5"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>
              <Image
                aria-hidden
                src="https://nextjs.org/icons/window.svg"
                alt="Window icon"
                width={16}
                height={16}
                style={{ marginRight: "8px" }}
              />
              
              Dataset <span>-&gt;</span>
            </p>
          </a>

        </div>        
      </main>

    </>
  );
}
