import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  CreateFeedbackAction,
  FeedbackActionTypes,
} from '../types/feedbackTypes';
import { createFeedback } from '../services/apiFeedbackService';
import { changeFeedbackValue } from '../actions/feedbackActions';
import { UserRoles } from '../constants/userRoles';

const getFeedback = (state: any) => state.feedback;
const userAuthId = (state: any) => state.auth.id;
const userOrderId = (state: any) => state.order.customer_id;
const orderId = (state: any) => state.order.id;

function* createFeedbackWorker(
  action: CreateFeedbackAction,
): Generator<StrictEffect, void, any> {
  try {
    const currentUserId = yield select(userAuthId);
    const customerId = yield select(userOrderId);
    const currentOrderId = yield select(orderId);
    yield put(changeFeedbackValue('text', action.payload.text));
    yield put(changeFeedbackValue('rating', action.payload.rating));
    yield put(changeFeedbackValue('orderId', currentOrderId));
    if (currentUserId === customerId) {
      yield put(changeFeedbackValue('author_role', UserRoles.USER));
      yield put(changeFeedbackValue('subject_role', UserRoles.DRIVER));
    } else {
      yield put(changeFeedbackValue('author_role', UserRoles.DRIVER));
      yield put(changeFeedbackValue('subject_role', UserRoles.USER));
    }
    const feedback = yield select(getFeedback);
    yield call(createFeedback, feedback);
  } catch (error: any) {
    return error;
  }
}

export function* feedbackWatcher() {
  yield takeEvery(FeedbackActionTypes.CREATE_FEEDBACK, createFeedbackWorker);
}
