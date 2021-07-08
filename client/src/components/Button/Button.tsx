import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { ButtonPropsI } from '../../types/interfaces';

export const CustomButton: FC<ButtonPropsI> = ({
  type,
  className,
  disabled,
  onClick,
  label,
  variant,
}) => {
  return (
    <Button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
    >
      {label}
    </Button>
  );
};
