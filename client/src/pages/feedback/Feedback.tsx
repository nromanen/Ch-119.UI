import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Form, Field } from 'react-final-form';
import { Button, Modal } from 'react-bootstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useFeedbackActions } from '../../hooks/useActions';
import './Feedback.scss';
import { required, maxValue } from '../../utils/validators';

export const Feedback: React.FC = () => {
  const isShown = useTypedSelector((state) => state.feedback.isShown);

  const { createFeedback, toggleModal, closeModal } = useFeedbackActions();

  const onSubmit = (values: any) => {
    const feedbackForm = {
      text: values.feedbackText,
      rating: values.stars,
    };
    return createFeedback(feedbackForm);
  };

  return (
    <Modal
      show={isShown}
      onHide={toggleModal}
      className="d-flex justify-content-center"
    >
      <Modal.Header closeButton className="modal__header">
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid }) => (
            <div>
              <form onSubmit={handleSubmit}>
                <Field name="stars" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <label className="star_label">
                        How would you rate your experience?
                      </label>
                      <div className="d-flex justify-content-center stars">
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={Number(input.value)}
                          onStarClick={input.onChange}
                        />
                      </div>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="feedbackText" validate={maxValue(1000)}>
                  {({ input, meta }) => (
                    <div>
                      <label>Do you have any additional comment?</label>
                      <textarea
                        {...input}
                        rows={5}
                        placeholder="Please, enter your comment here"
                        className="form-control input"
                      />
                      <div className="maxlength_warning">
                        {meta.error && (
                          <div className="alert alert-warning">
                            {meta.error && <span>{meta.error}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Field>
                <div className="d-flex justify-content-end buttons">
                  <Button
                    onClick={closeModal}
                    className="button button--hovered button--outlined button--border"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    className="button button--hovered button--outlined button--border submit_btn"
                    disabled={invalid}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          )}
        />
      </Modal.Body>
    </Modal>
  );
};

export default Feedback;
