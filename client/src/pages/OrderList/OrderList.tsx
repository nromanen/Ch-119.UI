import Navbar from './../../components/Navbar/Navbar';
import { Tab, Tabs } from 'react-bootstrap';
import { DriverActive } from './DriverLists/DriverActive';
import { DriverHistory } from './DriverLists/DriverHistory';
import { DriverCurrent } from './DriverLists/DriverCurrent';

import './OrderList.scss';

export enum Pages {
  ALL = 'ALL',
  CURRENT = 'CURRENT',
  HISTORY = 'HISTORY',
}

export const OrderList = () => {
  return (
    <>
      <div className="dark">
        <div className="wrap">
          <Tabs defaultActiveKey="profile" id="order__tabs">
            <Tab eventKey={Pages.HISTORY} title={Pages.HISTORY}>
              <DriverHistory />
            </Tab>
            <Tab eventKey={Pages.ALL} title={Pages.ALL}>
              <DriverActive />
            </Tab>
            <Tab eventKey={Pages.CURRENT} title={Pages.CURRENT}>
              <DriverCurrent />
            </Tab>
          </Tabs>

          <Navbar></Navbar>
        </div>
      </div>
    </>
  );
};
