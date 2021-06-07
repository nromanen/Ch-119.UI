import { FC } from 'react';
import { Autocomplete } from '@react-google-maps/api';

import {
  Accordion,
  Card,
  Badge,
  Form,
  Button,
  Jumbotron,
} from 'react-bootstrap';

interface OrderFormProps {
  createPath?: () => void;
  onFromAutocompleteLoad: (autocomplete: any) => void;
  onToAutocompleteLoad: (autocomplete: any) => void;
  onFromChanged: () => void;
  onToChanged: () => void;
  setTo: (v: string) => void;
  setFrom: (v: string) => void;
  map?: google.maps.Map;
  from: string;
  to: string;
}

export const OrderForm: FC<OrderFormProps> = ({
  createPath,
  onFromAutocompleteLoad,
  onFromChanged,
  onToAutocompleteLoad,
  onToChanged,
  map,
  from,
  to,
  setFrom,
  setTo,
}) => {
  return (
    <Jumbotron>
      <Form className="form">
        <Form.Group className="form-group">
          <Form.Label className="col-xs-2" htmlFor="from">
            From:
          </Form.Label>
          <div className="col-xs-4">
            {map && (
              <Autocomplete
                onLoad={onFromAutocompleteLoad}
                onPlaceChanged={onFromChanged}
              >
                <input
                  onChange={(e) => setFrom(e.target.value)}
                  value={from}
                  className="form-control"
                  type="text"
                  name="from"
                  id="from"
                  placeholder="Origin"
                />
              </Autocomplete>
            )}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label className="col-xs-2" htmlFor="to">
            To:
          </Form.Label>
          <div className="col-xs-4">
            {map && (
              <Autocomplete
                onLoad={onToAutocompleteLoad}
                onPlaceChanged={onToChanged}
              >
                <input
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="form-control"
                  type="text"
                  name="to"
                  id="to"
                  placeholder="Destination"
                />
              </Autocomplete>
            )}
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label className="col-xs-2" htmlFor="car-type">
            Car type:
          </Form.Label>
          <Form.Control
            as="select"
            defaultValue="Basic"
            id="car-type"
            className="form-select form-control col-xs-4"
            aria-label="Car type select"
          >
            <option value="Basic">Basic</option>
            <option value="Comfort">Comfort</option>
            <option value="Eco">Eco</option>
            <option value="Xl">Xl</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Accordion defaultActiveKey="0">
            <Accordion.Toggle as={Form.Label} variant="link" eventKey="0">
              Extra services:
            </Accordion.Toggle>
            <Card>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form.Check
                    id="option-1"
                    aria-label="option 1"
                    type="checkbox"
                    label="English speaking"
                    data-db-id="1"
                    value="English speaking"
                  />
                  <Form.Check
                    id="option-2"
                    aria-label="option 2"
                    type="checkbox"
                    label="Silent driver"
                  />
                  <Form.Check
                    id="option-3"
                    aria-label="option 3"
                    type="checkbox"
                    label="Baby chair"
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Form.Group>

        <Badge as="p" variant="primary">
          $ 15
        </Badge>
        <div className="col-xs-offset-2 col-xs-10">
          <Button onClick={createPath} variant="info">
            Calculate
          </Button>
          {/* <button  className="btn btn-lg btn-info">
          Calculate
        </button> */}
        </div>
      </Form>
    </Jumbotron>
  );
};
