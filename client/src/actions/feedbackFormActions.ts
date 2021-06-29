import { FeedbackFormActionTypes } from '../types/feedbackFormTypes';
import { FeedbackFormI } from '../utils/interfaces';

export const createFeedback = (values: FeedbackFormI) => ({
    type: FeedbackFormActionTypes.CREATE_FEEDBACK,
    payload: values,
});
