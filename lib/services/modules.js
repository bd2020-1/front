import api from '../api';


export async function getModuleQuestions(id) {
  return api.get(`/modules/${id}/questions`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}

export async function getModuleGroups(id) {
  return api.get(`/modules/${id}/questiongroups`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}

export async function getModules() {
  return api.get(`/modules/`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response?.data);
      throw new Error(errors);
    });
}

