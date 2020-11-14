import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/main.module.css'
import { Button } from 'antd';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          VODAN
        </h1>

        <p className={styles.description}>
          Consulta e Inserção de Respostas ao <b>Formulário WHO</b>
        </p>

        <div className={styles.grid}>
          <Link href="/records/insert/modules/1/participants/166">
            <Button type="primary" shape="round" size="large">
              <b>INSERIR RESPOSTAS</b>
            </Button>
          </Link>
          
          <a href="/records/consult/answer">
            <Button type="primary" shape="round" size="large">
              <b>CONSULTAR RESPOSTAS</b>
            </Button>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <b>Powered by - Alunos de Banco de Dados</b>
      </footer>
    </div>
  )
}
