import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import styles from '../../../../../styles/main.module.css'
import { Form, Input, Collapse } from 'antd';
const { Panel } = Collapse;
import { getModuleQuestions, getModuleGroups } from '../../../../../lib/services/modules';
import { getLastModuleAnswers } from '../../../../../lib/services/participants';
import BaseLayout from '../../../../../components/BaseLayout'

export const getServerSideProps = async ({ query }) => {
  const answers = await getLastModuleAnswers(query.participant_id)
  const questions = await getModuleQuestions(answers[0].crfFormsID);
  const groups = await getModuleGroups(answers[0].crfFormsID);
  return { props: { query, questions, groups, answers } };
};


export default function ConsultRecord({questions, groups, answers}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { participant_id } = router.query

  const questionFields = (questions) => questions.map((q) => {
    return(
      <>
        <Form.Item label={q.description} name={q.questionID}>
         {
           answers.map((a) => {
            if (a.questionID === q.questionID) {
              return(
                <Input disabled size="large" placeholder={a.participantAnswer ? a.participantAnswer : a.listParticipantAnswer} />
              )
            }

            }
          )
         }
        </Form.Item>
        
      </>
    )
  });

  const groupList = (groups, questions) => (
    <Collapse 
        accordion={true}
        bordered={false}
    >
      <Panel header="No group" key="0">
        {
          questionFields(questions.filter((q) => q.questionGroupID === null))
        }
      </Panel>
      {
        groups.map((g) =>
            <Panel header={g.description} key={g.questionGroupID}>
            { g.comment ?
              <div className={styles["group-comment"]}>
                <b>{g.comment}</b>
              </div>
              : ""
            }
            {
              questionFields(questions.filter((q) => q.questionGroupID === g.questionGroupID), g.questionGroupID)
            }
          </Panel>
        )
      }
    </Collapse>
  );

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(
      () => {
        setLoading(false);
      },
      3000
    )
  };

  return (
    <BaseLayout title="Consultar Respostas">
      <Link href="/">
        <h1 className={styles.title}>
          VODAN
        </h1>
      </Link>

      <p className={styles.description}>
      Módulo <b>{answers[0].formName}</b> ::  Consulta do último módulo respondido pelo participante <b>{participant_id}</b>. 
      </p>
      <Form
        layout="vertical" 
        className={styles.box}
        onFinish={onFinish}
      >
        {
          groupList(groups, questions, answers)
        }
      </Form>
    </BaseLayout>
  )
}