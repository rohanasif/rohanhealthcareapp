import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Healthcare App</h1>
      <p>Your path to better health management starts here.</p>
    </main>
  );
}
