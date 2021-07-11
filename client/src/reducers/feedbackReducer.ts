import { FeedbackAction, FeedbackActionTypes } from '../types/feedbackTypes';
import { FeedbackState } from './../types/feedbackTypes';

export const initialState: FeedbackState = {
  text: undefined,
  rating: undefined,
  authorRole: undefined,
  subjectRole: undefined,
  orderId: undefined,
  isShown: false,
};

export const feedbackReducer = (
  state = initialState,
  action: FeedbackAction,
): FeedbackState => {
  switch (action.type) {
    case FeedbackActionTypes.TOGGLE_MODAL:
      return { ...state, isShown: !state.isShown };
    case FeedbackActionTypes.RESET_FEEDBACK_STATE:
      return initialState;
    case FeedbackActionTypes.CHANGE_FEEDBACK_VALUES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
