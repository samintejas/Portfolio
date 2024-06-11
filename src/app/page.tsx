import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
    
      <Navbar />

      <div className={styles.container}>

        <div className={styles.textcontainer}>
          <div className={styles.heroContent}>
            <h1>Samin Tejas</h1>
            <p>Java Developer | Building scalable and performant systems.</p>
          </div>
        </div>
        <div className={styles.emptydiv}>
          
        </div>
      </div>
    </div>
  );
}
