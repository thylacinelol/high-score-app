import Head from "next/head";
import styles from "../styles/Home.module.css";
import Game from "./Game";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HighScoreApp</title>
        <meta name="description" content="Cobalt" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to HighScoreApp!</h1>

        <p className={styles.description}>
          Click "attempt" to roll the dice up to 10 times.
        </p>

        <Game></Game>
      </main>
    </div>
  );
}
