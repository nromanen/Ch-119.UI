import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
axios.defaults.headers = { 'Content-Type': 'application/json' };

export const createFeedback = async (body: any) => {
  try {
    const res = await axios.post(`/feedback`, body);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
