import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { FeedbackFormActionTypes } from '../types/feedbackFormTypes';
import { createFeedback } from '../services/apiFeedbackService';

function* createFeedbackWorker(
  action: any,
): Generator<StrictEffect, void, any> {
  yield call(createFeedback, action.payload);
}

export function* createFeedbackWatcher() {
  yield takeEvery(
    FeedbackFormActionTypes.CREATE_FEEDBACK,
    createFeedbackWorker,
  );
}
