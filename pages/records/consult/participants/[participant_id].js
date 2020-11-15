import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../../styles/main.module.css'
import { Select } from 'antd';
const { Option } = Select;
import { getModules } from '../../../../lib/services/modules';
import { allModulesAnswered } from '../../../../lib/services/participants';
import BaseLayout from '../../../../components/BaseLayout'
import React, { useState } from 'react';


export const getServerSideProps = async ({ query }) => {
  const modules = await getModules();
  const allModulesAnsweredByParticipant = await allModulesAnswered(query.participant_id);

  return { props: { query, modules, allModulesAnsweredByParticipant } };
};


export default function ConsultRecords({modules, allModulesAnsweredByParticipant}) {
  const router = useRouter();
  const { participant_id } = router.query

  const [modulesAnswered, setModulesAnswered] = useState(allModulesAnsweredByParticipant);

  const handleModuleFilter = async (moduleSelected) => {
    const modulesAnsweredByFilter = await allModulesAnswered(participant_id, moduleSelected);
    setModulesAnswered(modulesAnsweredByFilter);

  };

  const modulesOptions = [];
  const filterOptions = [];
  modules.forEach(function (item, indice, array) {
    filterOptions.push(<Option key={item["crfFormsID"]}>{item["description"]}</Option>);
    modulesOptions.push(item["description"]);
  });

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
          defaultValue={modulesOptions}
          onChange={handleModuleFilter}
        >
          {filterOptions}
        </Select>
        </div>
        

        {
          modulesAnswered.map((resp) => (
            <Link href={`../modules/${resp["crfFormsID"]}/participants/${participant_id}?dtRegisterForm=${resp["dtRegisterForm"]}&formName=${resp["FormsName"]}`}>
              <div className={styles.card} key={resp["formRecordID"]}>
                  <p><b>{resp["FormsName"]}</b></p>
                  <p>Data de preenchimento: {resp["dtRegisterForm"]}</p>
                </div>
            </Link>
          ))
        }

    </BaseLayout>
  )
}