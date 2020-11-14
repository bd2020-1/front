import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import styles from '../../../../../styles/main.module.css'
import { CheckOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Collapse, Badge } from 'antd';
const { Panel } = Collapse;
const { Option } = Select;
import { getModules } from '../../../../../lib/services/modules';
import { allModulesAnswered } from '../../../../../lib/services/participants';
import BaseLayout from '../../../../../components/BaseLayout'


// TODO modificar para pegar módulos via API
const modules = ['Admissão', 'Acompanhamento', 'Finalização'];
const filterOptions = [];
for (let i = 0; i < 3; i++) {
  filterOptions.push(<Option key={i+1}>{modules[i]}</Option>);
}

// const modulesAnswered= [{"formRecordID": 111, "module": "Admissão", "date": "10/02/2020"}, {"formRecordID": 222, "module": "Acompanhamento", "date": "15/02/2020"}]

export const getServerSideProps = async ({ query }) => {
  const modules = await getModules();
  // console.log(modules)
  const modulesAnswered = await allModulesAnswered(query.participant_id);
  return { props: { query, modulesAnswered } };
};


  // for (let i = 0; i < modules.lenght ; i++) {
  //   console.log(modules)
  //   filterOptions.push(<Option key={modules["crfFormsID"]}>{modules["description"]}</Option>);
  // }



export default function ConsultRecords({modulesAnswered}) {
  const router = useRouter();
  const { participant_id } = router.query

  console.log(modulesAnswered)
  console.log(modules)

  // console.log(modules)
  // const filterOptions = [];


  // const modulesFields = (modules) => modules.map((q) => {
  //   console.log(modules)
  // });


  // modules.map((module) => (
  //   console.log(module)
  // ))

  // modules.forEach(function (item, indice, array) {
  //   filterOptions.push(<Option key={item["crfFormsID"]}>{item["description"]}</Option>);
  // });


  // for (let i = 0; i < modules.lenght ; i++) {
  //   console.log(modules[i])
  //   filterOptions.push(<Option key={modules[i]["crfFormsID"]}>{modules[i]["description"]}</Option>);
  // }

  // modules.forEach((module) => {
  //   filterOptions.push(<Option key={module["crfFormsID"]}>{module["description"]}</Option>);
  // });



  return (
    <BaseLayout title="Consultar Respostas">
      <Link href="/">
        <h1 className={styles.title}>
          VODAN
        </h1>
      </Link>

      <p className={styles.description}>
        Consultar Respostas
      </p>

      <div className={styles.grid}>
      <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Selecione um módulo"
          defaultValue={modules}
        >
          {filterOptions}
        </Select>
        </div>

        {modulesAnswered.map((resp) => (
          <Link href={`records/consult/[formRecordID]?formRecordID=${resp["formRecordID"]}`} as={`${resp["formRecordID"]}`}>
            <div className={styles.card} key={resp["formRecordID"]}>
                <p><b>{resp["formRecordID"]}</b></p>
                <p>Data de preenchimento: {resp["dtRegisterForm"]}</p>
              </div>
          </Link>
        ))}

    </BaseLayout>
  )
}