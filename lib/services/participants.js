import api from '../api';


export async function getParticipants() {
  return api.get(`/participants`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}

export async function getParticipantNextAvailableModules(id) {
  return api.get(`/participants/${id}/modules/available`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}

export async function newParticipant() {
  return api.post(`/participants/`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}

export async function newFormRecord(id, module_id, answers) {
  return api({
    method: 'post',
    url: `/participants/${id}/newrecord/${module_id}`,
    data: {answers},
  }).then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}


export async function allModulesAnswered(id, moduleSelected) {
  let route;
  if (moduleSelected) {
    route = `/participants/${id}/modules?list_modules=${moduleSelected},`
  }
  else {
    route = `/participants/${id}/modules`
  }
  console.log(`route ${route}`)
  return api.get(route)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}

export async function getAnswersByDate(participant_id, module_id, dt_register) {
  return api.get(`participants/${participant_id}/questions/${module_id}?data_attendance=${dt_register}`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}

export async function getLastModuleAnswers(participant_id) {
  return api.get(`participants/${participant_id}/last/module`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}
