import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/navbar";
import LinkButton from "@/components/button";
import Button from "@/components/button";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className={styles.container}>
      <div className={styles.emptydiv}>

      <Image src="/dev2.png" alt="Your logo description" width={627} height={585} />
        
      </div>
        <div className={styles.textcontainer}>
          <div className={styles.heroContent}>
            <h2>Crafting Exceptional Backend Systems</h2>
            <p>Delivering scalable, high-performance backend systems with designed with cutting-edge tools and industry standards. Empowering your projects with reliable, efficient, and future-ready solutions.</p>

            <Button label="Learn more" link="/about"/>

          </div>
        </div>
        
      </div>
    </div>
  );
}
