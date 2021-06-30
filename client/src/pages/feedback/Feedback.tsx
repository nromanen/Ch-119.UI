import React, { useState } from 'react';
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
import { useEffect } from 'react';

export const Feedback: React.FC = () => {
  const isShown = useTypedSelector((state) => state.order.showModal);

  const orderId = useTypedSelector((state) => state.order.id);
  const userAuthId = useTypedSelector((state) => state.auth.id);
  const userOrderId = useTypedSelector((state) => state.order.customer_id);
  const [authorRole, setAuthorRole] = useState<number>(0);
  const [subjectRole, setSubjectRole] = useState<number>(0);
  useEffect(() => {
    if (userAuthId === userOrderId) {
      setAuthorRole(1);
      setSubjectRole(2);
    } else {
      setAuthorRole(2);
      setSubjectRole(1);
    }
  });

  const { toggleModal } = useOrderActions();
  const { createFeedback } = useFeedbackFormActions();

  const onSubmit = (values: any) => {
    const feedback = {
      text: values.feedbackText,
      rating: values.stars,
      author_role: authorRole,
      subject_role: subjectRole,
      orderId: Number(orderId),
    };
    return createFeedback(feedback);
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
                  <Button variant="secondary" onClick={toggleModal}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="submit_btn"
                    disabled={invalid}
                    onClick={toggleModal}
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
