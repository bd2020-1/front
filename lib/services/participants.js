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

export async function allModulesAnswered(id) {
  return api.get(`/participants/${id}/modules`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}