import Navbar from './../../components/Navbar/Navbar';
import { Tab, Tabs } from 'react-bootstrap';
import { DriverActive } from './DriverLists/DriverActive';
import { DriverHistory } from './DriverLists/DriverHistory';
import { DriverCurrent } from './DriverLists/DriverCurrent';

import './OrderList.scss';
import { useEffect } from 'react';
import {
  useMapActions,
  useDriverOrderNewActions,
  useUserOrderActions,
} from './../../hooks/useActions';
import { UserCurrent } from './UserLists/UserCurrent';
import { UserHistory } from './UserLists/UserHistory';

export enum Pages {
  ALL = 'ALL',
  CURRENT = 'CURRENT',
  HISTORY = 'HISTORY',
}

export const OrderList = () => {
  // TODO fix it. Remove. Do not have cityInfo because its call in order page.
  const { getCurrentLocation } = useMapActions();
  const {
    fetchDriverOrderCurrentAction,
    fetchDriverOrderHistoryAction,
    fetchDriverOrderNewAction,
  } = useDriverOrderNewActions();
  const { fetchUserOrderCurrentAction, fetchUserOrderHistoryAction } =
    useUserOrderActions();
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <>
      <div className="dark">
        <div className="wrap">
          <Tabs defaultActiveKey={Pages.ALL} id="order__tabs">
            <Tab
              onEnter={fetchDriverOrderHistoryAction}
              eventKey={Pages.HISTORY}
              title={Pages.HISTORY}
              mountOnEnter={true}
            >
              <DriverHistory />
            </Tab>
            <Tab
              eventKey={Pages.ALL}
              title={Pages.ALL}
              onEnter={fetchDriverOrderNewAction}
            >
              <DriverActive />
            </Tab>
            <Tab
              eventKey={Pages.CURRENT}
              title={Pages.CURRENT}
              onEnter={fetchDriverOrderCurrentAction}
            >
              <DriverCurrent />
            </Tab>
            <Tab
              eventKey={'USER_HISTORY'}
              title={'USER HISTORY'}
              onEnter={fetchUserOrderHistoryAction}
            >
              <UserHistory />
            </Tab>
            <Tab
              eventKey={'USER_CURRENT'}
              title={'USER CURRENT'}
              onEnter={fetchUserOrderCurrentAction}
            >
              <UserCurrent />
            </Tab>
          </Tabs>

          <Navbar></Navbar>
        </div>
      </div>
    </>
  );
};
