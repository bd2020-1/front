import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import styles from '../../../../../../styles/main.module.css'
import { Form, Input, Collapse } from 'antd';
const { Panel } = Collapse;
import { getModuleQuestions, getModuleGroups } from '../../../../../../lib/services/modules';
import { getAnswersByDate } from '../../../../../../lib/services/participants';
import BaseLayout from '../../../../../../components/BaseLayout'

export const getServerSideProps = async ({ query }) => {
  const questions = await getModuleQuestions(query.module_id);
  const groups = await getModuleGroups(query.module_id);
  const answers = await getAnswersByDate(query.participant_id, query.module_id, query.dtRegisterForm)
  return { props: { query, questions, groups, answers } };
};


export default function ConsultRecord({questions, groups, answers}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { module_id, participant_id, dtRegisterForm, formName } = router.query

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
        Consultar módulo <b>{formName}</b> do participante <b>{participant_id}</b> respondido na data <b>{dtRegisterForm}</b>
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