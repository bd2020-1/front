import styles from "../styles/main.module.css";
import Head from "next/head";

export default function BaseLayout ({title, children}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title||'Vodan'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <b>Powered by - Alunos de Banco de Dados</b>
      </footer>
    </div>
  )
}
