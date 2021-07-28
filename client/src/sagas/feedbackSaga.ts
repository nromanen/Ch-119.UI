import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  CreateFeedbackAction,
  FeedbackActionTypes,
} from '../types/feedbackTypes';
import { createFeedback } from '../services/apiFeedbackService';
import { toggleModal, changeFeedbackValues } from '../actions/feedbackActions';
import { UserRoles } from '../constants/userRoles';
import { removeOrderFromDriverListAction } from '../actions/driverOrderNewActions';
import { go } from 'react-router-redux';

const getFeedback = (state: any) => state.feedback;
const userAuthId = (state: any) => state.auth.id;
const orderId = (state: any) => state.orders.current[0]?.id;

function* createFeedbackWorker(
  action: CreateFeedbackAction,
): Generator<StrictEffect, void, any> {
  try {
    const currentUserId = yield select(userAuthId);
    const currentOrderId = yield select(orderId);
    const feedbackState = yield select(getFeedback);
    const feedback = {
      text: action.payload.text,
      rating: action.payload.rating,
      authorRole:
        currentUserId === feedbackState.customerId
          ? UserRoles.USER
          : UserRoles.DRIVER,
      subjectRole:
        currentUserId === feedbackState.customerId
          ? UserRoles.DRIVER
          : UserRoles.USER,
    };
    yield put(changeFeedbackValues(feedback));
    const feedbackStateFinal = yield select(getFeedback);
    yield call(createFeedback, feedbackStateFinal);
    yield put(
      removeOrderFromDriverListAction({
        filterKey: 'id',
        value: currentOrderId,
        filterList: 'current',
      }),
    );
    yield put(toggleModal());
    yield put(go(0));
  } catch (error: any) {
    return error;
  }
}

function* closeModalWorker(): Generator<StrictEffect, void, any> {
  try {
    const currentOrderId = yield select(orderId);
    yield put(
      removeOrderFromDriverListAction({
        filterKey: 'id',
        value: currentOrderId,
        filterList: 'current',
      }),
    );
    yield put(toggleModal());
  } catch (error: any) {
    return error;
  }
}

export function* feedbackWatcher() {
  yield takeEvery(FeedbackActionTypes.CREATE_FEEDBACK, createFeedbackWorker);
  yield takeEvery(FeedbackActionTypes.CLOSE_MODAL, closeModalWorker);
}
