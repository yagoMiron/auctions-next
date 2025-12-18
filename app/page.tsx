import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Link href={"/auctioneer"} className={styles.linkBtn}>
        Leiloar Item
      </Link>
      <Link href={"/auctions-cliente"} className={styles.linkBtn}>
        Dar Lance
      </Link>
    </div>
  );
}
