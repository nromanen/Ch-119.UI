export interface FeedbackState {
  text: string | null;
  rating: number | null;
  authorRole: number | null;
  subjectRole: number | null;
  orderId: number | null;
  isShown: boolean;
}

export interface FeedbackFormI {
  text: string | null;
  rating: number | null;
}

export interface CreateFeedbackAction {
  type: FeedbackActionTypes.CREATE_FEEDBACK;
  payload: FeedbackFormI;
}

export interface ToggleModalAction {
  type: FeedbackActionTypes.TOGGLE_MODAL;
}

export interface CloseModalAction {
  type: FeedbackActionTypes.CLOSE_MODAL;
}

export interface ResetFeedbackState {
  type: FeedbackActionTypes.RESET_FEEDBACK_STATE;
}

export interface ChangeFeedbackValuesAction {
  type: FeedbackActionTypes.CHANGE_FEEDBACK_VALUES;
  payload: {};
}

export enum FeedbackActionTypes {
  CREATE_FEEDBACK = 'CREATE_FEEDBACK',
  TOGGLE_MODAL = 'TOGGLE_MODAL',
  CHANGE_FEEDBACK_VALUES = 'CHANGE_FEEDBACK_VALUES',
  CLOSE_MODAL = 'CLOSE_MODAL',
  RESET_FEEDBACK_STATE = 'RESET_FEEDBACK_STATE',
}

export type FeedbackAction =
  | CreateFeedbackAction
  | ToggleModalAction
  | CloseModalAction
  | ChangeFeedbackValuesAction
  | ResetFeedbackState;
