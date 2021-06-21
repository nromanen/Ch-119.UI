import { FeedbackAction, FeedbackActionTypes } from '../types/feedbackTypes';

export const showModal = (): FeedbackAction => {
  return {
    type: FeedbackActionTypes.SHOW_MODAL,
  };
};

export const hideModal = (): FeedbackAction => {
  return {
    type: FeedbackActionTypes.HIDE_MODAL,
  };
};
