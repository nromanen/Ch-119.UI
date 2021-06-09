import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import StarRatingComponent from 'react-star-rating-component';

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);

  const onStarClick = (nextValue: any) => {
    setRating(nextValue);
  };

  return (
    <Form>
      <Form.Group controlId="formFeedback">
        <Form.Label>Feedback text</Form.Label>
        <Form.Control type="textarea" placeholder="Enter feedback" />
      </Form.Group>

      <Form.Group controlId="formRating">
        <Form.Label>Rate client</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
      />
    </Form>
  );
};

export default Feedback;
