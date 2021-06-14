import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Form, Field } from 'react-final-form';
import { createFeedback } from '../../services/apiFeedbackService';
import {
  useParams,
} from 'react-router-dom';

const Feedback: React.FC = () => {
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
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <div>
            <form onSubmit={handleSubmit}>
              <Field name="stars" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Rate client:</label>
                    <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={Number(input.value)}
                      onStarClick={input.onChange}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="feedbackText" validate={maxValue(1000)}>
                {({ input, meta }) => (
                  <div>
                    <label>Feedback (optional)</label>
                    <textarea
                      {...input}
                      rows={5}
                      placeholder="Type your feedback..."
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
            <button>No, thanks</button>
          </div>
        )}
      />
    </div>
  );
};

export default Feedback;
