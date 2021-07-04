import { FeedbackAction, FeedbackActionTypes } from '../types/feedbackTypes';
import { FeedbackState } from './../types/feedbackTypes';

export const initialState: FeedbackState = {
  text: '',
  rating: undefined,
  author_role: undefined,
  subject_role: undefined,
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
    case FeedbackActionTypes.CHANGE_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
