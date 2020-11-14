import styles from "../../../styles/main.module.css";
import Head from "next/head";
import {Button} from "antd";
import Link from "next/link";

export default function Answer () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Consultar respostas dos participantes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          CONSULTAR
        </h1>

        <p className={styles.description}>
          Informe o ID do participante e em seguida escolha uma das opções de consulta abaixo
        </p>

        <div className={styles.grid}>
          <input type="text" className={styles.search_input} id="name" placeholder="ID do participante" required=""/>
          <label htmlFor="name" className={styles.search_label}>ID do participante</label>
        </div>

        <div className={styles.grid}>
          <Link href="/records/consult/last-module/answered">
            <Button type="primary" shape="round" size="large">
              <b>Último módulo respondido</b>
            </Button>
          </Link>
          <Link href="/records/consult/all-modules-answered">
            <Button type="primary" shape="round" size="large">
              <b>Todos os módulos respondidos</b>
            </Button>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <b>Powered by - Alunos de Banco de Dados</b>
      </footer>
    </div>
  )
}
