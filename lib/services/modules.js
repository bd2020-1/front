import api from '../api';


export default async function moduleQuestions(id) {
  return api.get(`/modules/${id}/questions`)
    .then((res) => res.data)
    .catch((err) => {
      const errors = JSON.stringify(err.response.data);
      throw new Error(errors);
    });
}
