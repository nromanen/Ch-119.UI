import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import { FormLabelI } from '../../types/interfaces';
import './FormLabel.scss';

export const FormLabel: FC<FormLabelI> = ({
  classNames = [],
  title,
  htmlFor,
  children,
}) => {
  const classes = classNames.concat('col-xs-2', 'form__label').join(' ');

  return (
    <Form.Label className={classes} htmlFor={htmlFor}>
      {title}
      {children}
    </Form.Label>
  );
};
