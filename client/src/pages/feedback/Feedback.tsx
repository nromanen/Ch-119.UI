import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Form, Field } from 'react-final-form';
import { createFeedback } from '../../services/apiFeedbackService';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useFeedbackActions } from '../../hooks/useActions';
import { ParamTypes } from '../../utils/interfaces';
import './Feedback.scss';

export const Feedback: React.FC = () => {
  const isShown = useTypedSelector((state) => state.feedback.isShown);
  const { hideModal } = useFeedbackActions();

  const { orderId } = useParams<ParamTypes>();

  const onSubmit = async (values: any) => {
    const feedback = {
      text: values.feedbackText,
      rating: values.stars,
      author_id: 13,
      subject_id: 31,
      orderId: Number(orderId),
    };
    console.log(feedback);
    return await createFeedback(feedback);
  };

  const required = (value: any) => (value ? undefined : 'Required');

  const maxValue = (max: any) => (value: any) =>
    !value || value?.length <= max ? undefined : `Max length is ${max} symbols`;

  return (
    <Modal
      show={isShown}
      onHide={hideModal}
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
                  <Button variant="secondary" onClick={hideModal}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="submit_btn"
                    disabled={invalid}
                    onClick={hideModal}
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
