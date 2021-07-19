import React, { FC } from 'react';
import { OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { FormLabel } from '../FormLabel/FormLabel';
import { ExtraServiceItemI } from '../../types/cityInfoTypes';
import { extraServicesIcons } from './icons';

export const ExtraServiceItem: FC<ExtraServiceItemI> = ({
  id,
  name,
  onExtraServicesChanged,
  isActive,
  showTitle,
  iconActiveClass = 'active',
  iconClasses = [],
}) => {
  const iconClass = iconClasses;
  if (isActive) {
    iconClass.push(iconActiveClass);
  }

  const Icon: any = extraServicesIcons[id];
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-top-${id}`}>
          <strong>{name}</strong>.
        </Tooltip>
      }
    >
      <FormLabel
        title={showTitle && name}
        classNames={['extra-services__label']}
        htmlFor={name}
      >
        <Form.Check
          hidden
          id={name}
          aria-label={name}
          type="checkbox"
          data-db-id={id}
          name="extraServices"
          value={name}
          onChange={onExtraServicesChanged}
        />
        <Icon className={iconClass.join(' ')} />
      </FormLabel>
    </OverlayTrigger>
  );
};
