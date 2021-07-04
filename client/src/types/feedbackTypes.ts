import { FeedbackFormI } from '../utils/interfaces';

export interface FeedbackState {
  text: string;
  rating: number | undefined;
  author_role: number | undefined;
  subject_role: number | undefined;
  orderId: number | undefined;
  isShown: boolean;
}

type ValueOf<T> = T[keyof T];

export type FeedbackValues = ValueOf<FeedbackState>;

export interface CreateFeedbackAction {
  type: FeedbackActionTypes.CREATE_FEEDBACK;
  payload: FeedbackFormI;
}

export interface ToggleModalAction {
  type: FeedbackActionTypes.TOGGLE_MODAL;
}

export interface ChangeValueAction {
  type: FeedbackActionTypes.CHANGE_VALUE;
  payload: {
    prop: keyof FeedbackState;
    value: FeedbackValues;
  };
}

export enum FeedbackActionTypes {
  CREATE_FEEDBACK = 'CREATE_FEEDBACK',
  TOGGLE_MODAL = 'TOGGLE_MODAL',
  CHANGE_VALUE = 'CHANGE_VALUE',
}

export type FeedbackAction =
  | CreateFeedbackAction
  | ToggleModalAction
  | ChangeValueAction;
