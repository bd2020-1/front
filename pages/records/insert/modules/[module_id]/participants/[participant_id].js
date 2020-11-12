import Head from 'next/head'
import styles from '../../../../../../styles/main.module.css'
import { Form, Input, Select } from 'antd';
const { Option } = Select;
import { Button } from 'antd';
import moduleQuestions from '../../../../../../lib/services/modules';
import { useRouter } from 'next/router'

export const getServerSideProps = async ({ query }) => {
  const questions = await moduleQuestions(query.module_id);
  return { props: { query, questions } };
};


export default function InsertRecord({questions}) {
  const router = useRouter()
  const { module_id, participant_id } = router.query
  console.log(module_id, participant_id)
  return (
    <div className={styles.container}>
      <Head>
        <title>Inserir Respostas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          VODAN
        </h1>

        <p className={styles.description}>
          Inserção de Respostas
        </p>
        <Form
          layout="vertical" 
          className={styles.box}
        >
          {
            questions.map((q) => {
              let i;
              if(q.listTypeID)
                i = (
                  <Select
                    size="large"
                    showSearch
                    placeholder={q.description}
                    style={{ width: '100%' }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {q.ListValues.map(
                      (v) => (<Option value={v.listOfValuesID}>{v.description}</Option>)
                    )}
                  </Select>)
              else
                i = (<Input size="large" placeholder={q.description} />)
              return(
                <>
                  <Form.Item label={q.description} name={q.questionID}>
                    {i}
                  </Form.Item>
                  
                </>
              )
            })
          }
          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round" size="large" className={styles['submit-record']}>
              <b>INSERIR RESPOSTAS</b>
            </Button>
          </Form.Item>
        </Form>
      </main>
      <footer className={styles.footer}>
        <b>Powered by - Alunos de Banco de Dados</b>
      </footer>
    </div>
  )
}