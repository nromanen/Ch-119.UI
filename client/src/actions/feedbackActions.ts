import {
  ChangeValueAction,
  FeedbackActionTypes,
  FeedbackState,
  FeedbackValues,
} from '../types/feedbackTypes';
import { FeedbackFormI } from '../utils/interfaces';

export const createFeedback = (values: FeedbackFormI) => ({
  type: FeedbackActionTypes.CREATE_FEEDBACK,
  payload: values,
});

export const toggleModal = () => ({
  type: FeedbackActionTypes.TOGGLE_MODAL,
});

export const changeFeedbackValue = (
  prop: keyof FeedbackState,
  value: FeedbackValues,
): ChangeValueAction => ({
  type: FeedbackActionTypes.CHANGE_VALUE,
  payload: {
    prop,
    value,
  },
});
