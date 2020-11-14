import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import styles from '../../../../../../styles/main.module.css'
import { CheckOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Collapse, Badge } from 'antd';
const { Panel } = Collapse;
const { Option } = Select;
import { getModuleQuestions, getModuleGroups } from '../../../../../../lib/services/modules';
import BaseLayout from '../../../../../../components/BaseLayout'

export const getServerSideProps = async ({ query }) => {
  const questions = await getModuleQuestions(query.module_id);
  const groups = await getModuleGroups(query.module_id);
  return { props: { query, questions, groups } };
};


export default function InsertRecord({questions, groups}) {
  const router = useRouter();
  const [groupEmptyInputs, setGroupEmptyInputs] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { module_id, participant_id } = router.query

  const setGroupTags = (groups, questions) => {
    let aux = [...groupEmptyInputs]
    groups.forEach((g) => {
      aux[g.questionGroupID] = 0;
      questions.filter((q) => q.questionGroupID === g.questionGroupID).forEach(
        (q) => {
          if(!answers[q.questionID])
            aux[g.questionGroupID] += 1;
        }
      )
    });
    setGroupEmptyInputs(aux);
  }

  const onInputChange = (id, value) => {
    answers[id] = value;
    setAnswers([...answers]);
    setGroupTags(groups, questions);
  }

  const questionFields = (questions) => questions.map((q) => {
    let i;
    if(q.listTypeID)
      i = (
        <Select
          size="large"
          showSearch
          placeholder={q.description}
          style={{ width: '100%' }}
          optionFilterProp="children"
          onChange={(e) => onInputChange(q.questionID, e)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {q.ListValues.map(
            (v) => (<Option value={v.listOfValuesID}>{v.description}</Option>)
          )}
        </Select>)
    else
      i = (<Input onChange={(e) => onInputChange(q.questionID, e.target.value)} size="large" placeholder={q.description} />)
    return(
      <>
        <Form.Item label={q.description} name={q.questionID}>
          {i}
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
            <Panel header={g.description} key={g.questionGroupID} extra={genExtra(g.questionGroupID)}>
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

  const genExtra = (groupId) => {
    if (groupEmptyInputs[groupId] === undefined)
      setGroupTags(groups, questions)
    if (groupEmptyInputs[groupId] === 0)
      return (
        <CheckOutlined style={{color: "green"}}/>
      );
    return (
      <Badge count={groupEmptyInputs[groupId]} />
    );
}

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(
      () => {
        setLoading(false);
      },
      3000
    )
    console.log(questions, values)
    console.log(
      Object.entries(values).filter(([id, v]) => v ==! undefined).map(
        ([id, v]) => {
          const question = questions.find((q) => q.questionID === parseFloat(id));
          console.log(question, id)
          return ({
            questionID: id,
            answer: question.listTypeID ? null : v,
            listOfValuesID: question.listTypeID ? v : null,
          })
        }
      )
    );
    // let payload = {}
    // payload.answers = answers.map((a, i) = ({

    // }))
    // return resetPassword({ token, values }).then(
    //   (res) => {
    //     setLoading(false);
    //     router.push('/');
    //   },
    // ).catch(
    //   (err) => {
    //     setLoading(false);
    //   },
    // );
  };

  return (
    <BaseLayout title="Inserir Respostas">
      <Link href="/">
        <h1 className={styles.title}>
          VODAN
        </h1>
      </Link>

      <p className={styles.description}>
        Inserção de Respostas
      </p>
      <Form
        layout="vertical" 
        className={styles.box}
        onFinish={onFinish}
      >
        {
          groupList(groups, questions)
        }
        <Form.Item style={{ textAlign: "center" }}>
          <Button loading={loading} type="primary" htmlType="submit" shape="round" size="large" className={styles['submit-record']}>
            <b>INSERIR RESPOSTAS</b>
          </Button>
        </Form.Item>
      </Form>
    </BaseLayout>
  )
}