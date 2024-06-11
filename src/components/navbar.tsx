import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import LogoImage from "./logo.svg";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">SAMIN TEJAS</Link>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>

        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
