import React, { FC } from 'react';
import { OverlayTrigger, Tooltip, Form } from 'react-bootstrap';

import { ReactComponent as BabyChair } from './icons/babyChair.svg';
import { ReactComponent as En } from './icons/en.svg';
import { ReactComponent as Silent } from './icons/silent.svg';
import { FormLabel } from './FormLabel';

interface IconsI {
  [index: string]: any;
}

const extraServicesIcons: IconsI = {
  'English speaking': En,
  'Silent driver': Silent,
  'Baby chair': BabyChair,
};
interface ExtraServiceItemI {
  id: string | number;
  name: string;
  onExtraServicesChanged: (e: any) => any;
  isActive: boolean;
  showTitle: boolean;
  iconActiveClass?: string;
  iconClasses: string[];
}

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

  const Icon: any = extraServicesIcons[name];
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
        classNames={['extra-service__label']}
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
