import styles from "./page.module.css";
import Navbar from "@/components/navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className={styles.aboutcontainer}>
        <div className={styles.about}>
          <h2>About</h2>
          <p>
            Result-driven Java backend software developer with a strong track
            record of 3 years, focused on designing, developing, optimizing
            performance, and maintaining billing and payment systems within
            Telecom BSS stacks. Dedicated to achieving high-quality outcomes,
            skilled in effective debugging, and adept at maintaining a smooth
            coding and personal workflow. Proficient in tailoring solutions to
            address unique needs. A clear and collaborative communicator with a
            sincere commitment to task ownership. Enthusiastic about creating
            clean code that not only performs but is also enjoyable to work
            with.
          </p>
        </div>
        <div className={styles.expcontainer}>

        <h2>Experience</h2>
          <h3>Software Engineer @ 6D Technologies</h3>
          <ul>
            <li>
              Exceeded SLA expectations by significantly accelerating billing
              core systems to handle bill-runs ,settlements and financial
              management for millions of simultaneous services.
            </li>
            <li>
              Collaborated with cross-functional teams to design, develop, and
              maintain Java-based backend systems for billing and payment
              functionalities within the BSS stack.
            </li>
            <li>
              Played a key role in the full software development lifecycle, from
              requirements analysis to implementation, testing, and deployment.
            </li>
            <li>
              Utilized strong debugging skills to identify and resolve complex
              issues, ensuring seamless operation of critical invoicing/payment
              processes.
            </li>
            <li>
              Demonstrated a commitment to code quality through rigorous code
              reviews and adherence to best practices.
            </li>
            <li>
              Mentored junior developers, fostering their growth and ensuring
              they achieved project goals.
            </li>
            <li>
              Engineered libraries enabling micro-services to dynamically
              distribute load across databases, facilitating seamless system
              scalability.
            </li>
            <li>
              Engineered libraries enabling simple REST APIs to be configured
              instead of going through development lifecycle.
            </li>
            <li>
              Established development environments, containerized multiple
              microservices, and orchestrated their deployment within a
              Kubernetes/open-shift architecture.
            </li>
            <li>
              Performed Vulnerability testing , performance testing and fixes
              ensuring security ,reliability and improved system performance
              across many micro-services.
            </li>
            <li>Performed core technology upgrades and migrations.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
