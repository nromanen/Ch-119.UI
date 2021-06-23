import { call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { FeedbackFormActionTypes } from '../types/feedbackFormTypes';
import { createFeedback } from '../services/apiFeedbackService';

function* createFeedbackWorker(
  action: any,
): Generator<StrictEffect, void, any> {
  try {
    yield call(createFeedback, action.payload);
  } catch (error) {
    return error;
  }
}

export function* createFeedbackWatcher() {
  yield takeEvery(
    FeedbackFormActionTypes.CREATE_FEEDBACK,
    createFeedbackWorker,
  );
}
