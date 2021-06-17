import { useState, useCallback, useEffect } from 'react';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useOrderActions } from '../../hooks/useActions';
import { useMapActions } from './../../hooks/useActions';

import { OrderForm } from './OrderForm';
import { MapContainer } from './MapContainer/MapContainer';

import './Order.scss';

export const Order = () => {
  const [fromAutocomplete, setFromAutocomplete] = useState({
    getPlace: () => {},
  });
  const [toAutocomplete, setToAutocomplete] = useState({ getPlace: () => {} });

  const { from, to } = useTypedSelector((state) => state.order);
  const { changeOrderValue } = useOrderActions();
  const { changeMapValue } = useMapActions();

  const { car_types, extra_services } = useTypedSelector(
    (state) => state.cityInfo,
  );

  const { getCurrentLocation } = useMapActions();

  useEffect(() => {
    getCurrentLocation();
    // getCurrentLocationF();
    // getCityInfoCreator('Чернівці');
    // getCityInfo().then((res) => {
    //   setInfo(res);
    // });
  }, []);

  const setFrom = useCallback((value: string) => {
    changeOrderValue('from', value);
  }, []);
  const setTo = useCallback((value: string) => {
    changeOrderValue('to', value);
  }, []);

  const onFromAutocompleteLoad = (autocomplete: any): void => {
    setFromAutocomplete(autocomplete);
  };
  const onToAutocompleteLoad = (autocomplete: any): void => {
    setToAutocomplete(autocomplete);
  };

  const onFromChanged = (): void => {
    if (fromAutocomplete !== null) {
      const geometry: any = fromAutocomplete.getPlace();
      setFrom(geometry.formatted_address);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };
  const onToChanged = (): void => {
    if (toAutocomplete !== null) {
      const geometry: any = toAutocomplete.getPlace();

      setTo(geometry.formatted_address);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const createPath = useCallback((): void => {
    const options: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    };
    changeMapValue('directions', options);
    // setDirections(options);
  }, []);

  const OrderFormProrps = {
    from,
    setFrom,
    to,
    setTo,
    onFromAutocompleteLoad,
    onToAutocompleteLoad,
    onFromChanged,
    onToChanged,
    createPath,
    carTypes: car_types,
    extraServices: extra_services,
    // currentCity,
  };

  return (
    <>
      <MapContainer />
      <OrderForm {...OrderFormProrps} />
    </>
  );
};
