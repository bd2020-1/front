import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../../../styles/main.module.css'
import { Select } from 'antd';
const { Option } = Select;
import { getModules } from '../../../../lib/services/modules';
import { allModulesAnswered } from '../../../../lib/services/participants';
import BaseLayout from '../../../../components/BaseLayout'


// TODO modificar para pegar módulos via API
const modules = ['Admissão', 'Acompanhamento', 'Finalização'];
const filterOptions = [];
for (let i = 0; i < 3; i++) {
  filterOptions.push(<Option key={i+1}>{modules[i]}</Option>);
}

export const getServerSideProps = async ({ query }) => {
  // const modules = await getModules();
  const modulesAnswered = await allModulesAnswered(query.participant_id);
  return { props: { query, modules, modulesAnswered } };
};


export default function ConsultRecords({modules, modulesAnswered}) {
  const router = useRouter();
  const { participant_id } = router.query

  // modules.forEach(function (item, indice, array) {
  //   filterOptions.push(<Option key={item["crfFormsID"]}>{item["description"]}</Option>);
  // });


  // for (let i = 0; i < modules.lenght ; i++) {
  //   console.log(modules[i])
  //   filterOptions.push(<Option key={modules[i]["crfFormsID"]}>{modules[i]["description"]}</Option>);
  // }


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
          <Link href={`../modules/${resp["crfFormsID"]}/participants/${participant_id}?dtRegisterForm=${resp["dtRegisterForm"]}&formName=${resp["FormsName"]}`}>
            <div className={styles.card} key={resp["formRecordID"]}>
                <p><b>{resp["FormsName"]}</b></p>
                <p>Data de preenchimento: {resp["dtRegisterForm"]}</p>
              </div>
          </Link>
        ))}

    </BaseLayout>
  )
}