import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Form, Field } from 'react-final-form';
import { Modal } from 'react-bootstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useFeedbackActions } from '../../hooks/useActions';
import './Feedback.scss';
import { required, maxValue } from '../../utils/validators';
import { CustomButton } from '../../components/Button/Button';

export const Feedback: React.FC = () => {
  const isShown = useTypedSelector((state) => state.feedback.isShown);

  const { createFeedback, toggleModal } = useFeedbackActions();

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
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                        className="form-control"
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
                  <CustomButton
                    variant="secondary"
                    onClick={toggleModal}
                    label="Close"
                  ></CustomButton>
                  <CustomButton
                    variant="primary"
                    type="submit"
                    onClick={toggleModal}
                    className="submit_btn"
                    disabled={invalid}
                    label="Send"
                  ></CustomButton>
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
