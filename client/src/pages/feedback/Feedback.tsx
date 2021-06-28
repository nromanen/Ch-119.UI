import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Form, Field } from 'react-final-form';
import { Button, Modal } from 'react-bootstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  useFeedbackFormActions,
  useOrderActions,
} from '../../hooks/useActions';
import './Feedback.scss';
import { required, maxValue } from '../../utils/validators';

export const Feedback: React.FC = () => {
  const isShownForDriver = useTypedSelector(
    (state) => state.order.showModalForDriver,
  );

  const orderId = useTypedSelector((state) => state.order.id);
  const authorId = useTypedSelector((state) => state.auth.id);

  const { toggleModalForDriver } = useOrderActions();
  const { createFeedback } = useFeedbackFormActions();

  const onSubmit = (values: any) => {
    const feedback = {
      text: values.feedbackText,
      rating: values.stars,
      author_id: Number(authorId),
      subject_id: 31,
      orderId: Number(orderId),
    };
    return createFeedback(feedback);
  };

  return (
    <Modal
      show={isShownForDriver}
      onHide={toggleModalForDriver}
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
                  <Button variant="secondary" onClick={toggleModalForDriver}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="submit_btn"
                    disabled={invalid}
                    onClick={toggleModalForDriver}
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
