import {
  ChangeFeedbackValuesAction,
  FeedbackActionTypes,
} from '../types/feedbackTypes';
import { FeedbackFormI } from '../types/feedbackTypes';

export const createFeedback = (values: FeedbackFormI) => ({
  type: FeedbackActionTypes.CREATE_FEEDBACK,
  payload: values,
});

export const closeModal = () => ({
  type: FeedbackActionTypes.CLOSE_MODAL,
});

export const toggleModal = () => ({
  type: FeedbackActionTypes.TOGGLE_MODAL,
});

export const resetFeedbackState = () => ({
  type: FeedbackActionTypes.RESET_FEEDBACK_STATE,
});

export const changeFeedbackValues = (
  props: any,
): ChangeFeedbackValuesAction => ({
  type: FeedbackActionTypes.CHANGE_FEEDBACK_VALUES,
  payload: {
    ...props,
  },
});
