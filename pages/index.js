import styles from "../styles/Home.module.css";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Layout from "../widget/Layout";

export default function Home() {
  return (
    <div>
      <Layout />
      <div className={styles.container}>
        <div className={styles.square}>
          <Image src={Logo} alt="logo" />
          <h3 className={styles.title}>Article Post</h3>

          <h5 className={styles.headline}>Lorem Post 1</h5>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <hr className={styles.line} />

          <h5 className={styles.headline}>Lorem Post 1</h5>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <hr className={styles.line} />

          <div>
            <a href="./peserta" target="#" className={styles.button}>
              Lihat Data Peserta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
