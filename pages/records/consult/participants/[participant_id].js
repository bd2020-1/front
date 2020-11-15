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

  return { props: { query, modules } };
};


export default function ConsultRecords({modules}) {
  const router = useRouter();
  const { participant_id } = router.query

  const handleModuleFilter = async (moduleSelected) => {
    console.log(`selected ${moduleSelected}`);
    const modulesAnsweredByFilter = await allModulesAnswered(participant_id, moduleSelected);
    setModulesAnswered(modulesAnsweredByFilter);

    return modulesAnsweredByFilter
  };

  const [modulesAnswered, setModulesAnswered] = useState(handleModuleFilter);

  const modulesOptions = [];
  const filterOptions = [];
  modules.forEach(function (item, indice, array) {
    filterOptions.push(<Option key={item["crfFormsID"]}>{item["description"]}</Option>);
    modulesOptions.push(item["description"]);
  });

  console.log("modulo aqui")
  console.log(modulesAnswered)

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
          modulesAnswered.then(function() {return modulesAnswered.map((resp) => (
            <Link href={`../modules/${resp["crfFormsID"]}/participants/${participant_id}?dtRegisterForm=${resp["dtRegisterForm"]}&formName=${resp["FormsName"]}`}>
              <div className={styles.card} key={resp["formRecordID"]}>
                  <p><b>{resp["FormsName"]}</b></p>
                  <p>Data de preenchimento: {resp["dtRegisterForm"]}</p>
                </div>
            </Link>
          ))})
        }

    </BaseLayout>
  )
}