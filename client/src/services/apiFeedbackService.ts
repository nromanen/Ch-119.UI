import axios from 'axios';
import { FEEDBACK_ROUTE } from '../constants/routerConstants';

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL}`;
axios.defaults.headers = { 'Content-Type': 'application/json' };

export const createFeedback = async (body: any) => {
  try {
    const { isShown, customerId, ...feedback } = body;
    const res = await axios.post(FEEDBACK_ROUTE, feedback);
    return res.data;
  } catch (e) {
    return e;
  }
};
