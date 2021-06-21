import { FeedbackFormActionTypes } from '../types/feedbackFormTypes';
import { FeedbackFormI } from '../utils/interfaces';

export const createFeedback = (values: FeedbackFormI) => {
  return {
    type: FeedbackFormActionTypes.CREATE_FEEDBACK,
    payload: values,
  };
};
