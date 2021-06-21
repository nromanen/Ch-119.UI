import { FeedbackAction, FeedbackActionTypes } from '../types/feedbackTypes';
import { FeedbackState } from './../types/feedbackTypes';

export const initialState: FeedbackState = {
  isShown: false,
};

export const feedbackReducer = (
  state = initialState,
  { type }: FeedbackAction,
): FeedbackState => {
  switch (type) {
    case FeedbackActionTypes.SHOW_MODAL:
      return { isShown: true };
    case FeedbackActionTypes.HIDE_MODAL:
      return { isShown: false };
    default:
      return state;
  }
};
