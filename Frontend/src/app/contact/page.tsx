import styles from "./page.module.css";
import Navbar from "@/components/navbar";

interface ContactForm {
  message: string;
  email: string;
}

export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className={styles.contact}>
        <h2></h2>
        <form method="POST" action="/your/server/endpoint">
          <div className={styles.input}>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <div className={styles.input}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit">Get in touch !</button>
        </form>
      </div>
    </div>
  );
}
