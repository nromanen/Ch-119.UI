import { FeedbackAction, FeedbackActionTypes } from '../types/feedbackTypes';

export const showModal = (): FeedbackAction => ({
    type: FeedbackActionTypes.SHOW_MODAL,
});

export const hideModal = (): FeedbackAction => ({
    type: FeedbackActionTypes.HIDE_MODAL,
});
