import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import {
  CreateFeedbackAction,
  FeedbackActionTypes,
} from '../types/feedbackTypes';
import { createFeedback } from '../services/apiFeedbackService';
import { toggleModal } from '../actions/feedbackActions';
import { UserRoles } from '../constants/userRoles';
import { removeOrderFromDriverListAction } from '../actions/driverOrderNewActions';

const userAuthId = (state: any) => state.auth.id;
const userOrderId = (state: any) => state.driverOrders.current[0].customer_id;
const orderId = (state: any) => state.driverOrders.current[0].id;

function* createFeedbackWorker(
  action: CreateFeedbackAction,
): Generator<StrictEffect, void, any> {
  try {
    const currentUserId = yield select(userAuthId);
    const customerId = yield select(userOrderId);
    const currentOrderId = yield select(orderId);
    const feedback = {
      text: action.payload.text,
      rating: action.payload.rating,
      orderId: currentOrderId,
      authorRole:
        currentUserId === customerId ? UserRoles.USER : UserRoles.DRIVER,
      subjectRole:
        currentUserId === customerId ? UserRoles.DRIVER : UserRoles.USER,
    };
    yield call(createFeedback, feedback);
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
