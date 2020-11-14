import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/main.module.css'
import { Button, Modal, Select, Form } from 'antd';
const { Option } = Select;
import BaseLayout from '../components/BaseLayout'
import React, { useState } from 'react';
import { getParticipants, getParticipantNextAvailableModules, newParticipant } from '../lib/services/participants';



export default function Home() {
  const router = useRouter()

  const [visible, setVisible] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [module, setModule] = useState(null);
  const [modules, setModules] = useState([]);

  const [newParticipantLoading, setNewParticipantLoading] = useState(false);

  const handleOk = () => {
    router.push(`/records/insert/modules/${module}/participants/${participant}`)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const showModal = async () => {
    const pt = await getParticipants();
    setParticipants(pt);
    setVisible(true);
  };

  const handleParticipantChange = async (participantId) => {
    setParticipant(participantId);
    const nextModules = await getParticipantNextAvailableModules(participantId);
    setModules(nextModules);
  };

  const handleModuleChange = async (moduleId) => {
    setModule(moduleId);
  };

  const handleNewParticipant = async () => {
    setNewParticipantLoading(true)
    const newparticipant = await newParticipant()
    router.push(`/records/insert/modules/1/participants/${newparticipant.participantID}`)
  }

  return (
    <BaseLayout title='Home - Vodan'>
      <Link href="/">
        <h1 className={styles.title}>
          VODAN
        </h1>
      </Link>
      

      <p className={styles.description}>
        Consulta e Inserção de Respostas ao <b>Formulário WHO</b>
      </p>

      <div className={styles.grid}>
        <Button type="primary" style={{ marginRight: '5px' }} onClick={showModal} shape="round" size="large">
          <b>INSERIR RESPOSTAS</b>
        </Button>
        
        <a href="/records/consult/answer">
          <Button type="primary" style={{ marginLeft: '5px' }} shape="round" size="large">
            <b>CONSULTAR RESPOSTAS</b>
          </Button>
        </a>
      </div>
      <Modal
        title="Escolher Participante"
        visible={visible}
        onOk={handleOk}
        okText="Inserir Respostas"
        cancelText="Cancelar"
        onCancel={handleCancel}
      >
        <Form
        layout="vertical" 
        >
          <Form.Item label="Participante">
            <Select
              size="large"
              showSearch
              placeholder="Participante"
              style={{ width: '100%'}}
              optionFilterProp="children"
              onChange={handleParticipantChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {participants.map(
                (p) => (<Option value={p.participantID}>{p.participantID.toString()}</Option>)
              )}
            </Select>
          </Form.Item>
          
          { modules.length ?
            <Form.Item label="Participante">
              <Select
                size="large"
                showSearch
                placeholder="Módulo"
                style={{ width: '100%' }}
                optionFilterProp="children"
                onChange={handleModuleChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {modules.map(
                  (m) => (<Option value={m.crfFormsID}>{m.description}</Option>)
                )}
              </Select>
            </Form.Item>
            : ''
          }
          <Button onClick={handleNewParticipant} loading={newParticipantLoading} shape="round" size="large" className={styles['submit-record']}>
            <b>Criar Novo Participante</b>
          </Button>
        </Form>
      </Modal>
    </BaseLayout>
  )
}
