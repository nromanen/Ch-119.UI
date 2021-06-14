import React, { useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Form, Field } from 'react-final-form';
import { createFeedback } from '../../services/apiFeedbackService';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

export type FeedbackProps = {
  isShown: boolean;
};

export const Feedback: React.FC<FeedbackProps> = ({ isShown }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isShown);
  }, [isShown]);

  const handleClose = () => setShow(false);

  interface ParamTypes {
    orderId: string;
  }

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
    !value || value?.length <= max ? undefined : `Should be less than ${max}`;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid }) => (
              <div>
                <form onSubmit={handleSubmit}>
                  <Field name="stars" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <label>How would you rate your experience?</label>
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={Number(input.value)}
                          onStarClick={input.onChange}
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
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
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <div className="buttons">
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={invalid}
                        onClick={handleClose}
                      >
                        Send
                      </Button>
                    </Modal.Footer>
                  </div>
                </form>
              </div>
            )}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Feedback;
