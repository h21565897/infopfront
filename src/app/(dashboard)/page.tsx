import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return <main className={styles.main}>ppppppppp</main>;
}
