import { FC } from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';
import { ExtraServicesSelectI } from '../../types/cityInfoTypes';
import { ExtraServiceItem } from './ExtraServiceItem';

export const ExtraServicesSelect: FC<ExtraServicesSelectI> = ({
  title,
  avaliableInCityExtraServices,
  activeExtraServices,
  onExtraServicesChanged,
}) => {
  return avaliableInCityExtraServices ? (
    <Accordion defaultActiveKey="0">
      <Accordion.Toggle
        as={Form.Label}
        className="form__label"
        variant="link"
        eventKey="0"
      >
        {title || 'Extra services:'}
      </Accordion.Toggle>
      <Card>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="extra-services">
            {avaliableInCityExtraServices.map(({ id, name }) => {
              const isActive = activeExtraServices.includes(id);

              return (
                <ExtraServiceItem
                  key={id}
                  id={id}
                  name={name}
                  onExtraServicesChanged={onExtraServicesChanged}
                  isActive={isActive}
                  iconClasses={['order__service-icon']}
                  showTitle={false}
                />
              );
            })}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  ) : null;
};
