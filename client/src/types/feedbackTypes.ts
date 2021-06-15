export interface FeedbackState {
  isShown: boolean;
}

export interface FeedbackAction {
  type: string;
}
export enum FeedbackActionTypes {
  SHOW_MODAL = 'SHOW_MODAL',
  HIDE_MODAL = 'HIDE_MODAL',
}
