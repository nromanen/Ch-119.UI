import axios from 'axios';
import { FEEDBACK_ROUTE } from '../constants/routerConstants';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
axios.defaults.headers = { 'Content-Type': 'application/json' };

export const createFeedback = async (body: any) => {
  try {
    const res = await axios.post(FEEDBACK_ROUTE, body);
    return res.data;
  } catch (e) {
    return e;
  }
};
