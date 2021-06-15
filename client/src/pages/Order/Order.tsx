import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Map } from './Map';
import { OrderForm } from './OrderForm';
import { useInfoActions, useOrderActions } from '../../hooks/useActions';

import './Order.scss';

export interface CurrentLocation {
  lat: number;
  lng: number;
}

export const Order = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsRequest>();

  const [fromAutocomplete, setFromAutocomplete] = useState({
    getPlace: () => {},
  });
  const [toAutocomplete, setToAutocomplete] = useState({ getPlace: () => {} });

  const { from, to } = useTypedSelector((state) => state.order);
  const { changeValue } = useOrderActions();

  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>();
  const [currentCity, setCurrentCity] = useState<string>();
  const { car_types, extra_services } = useTypedSelector((state) => state.info);

  const { getInfoCreator } = useInfoActions();
  useEffect(() => {
    getCurrentLocation();
    getInfoCreator('Чернівці');
    // getCityInfo().then((res) => {
    //   setInfo(res);
    // });
  }, []);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const loc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      getCityByLocation(loc);
      setCurrentLocation(loc);
    });
  };

  const getCityByLocation = async (l: CurrentLocation) => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          key: process.env.REACT_APP_MAP_API_KEY,
          latlng: `${l.lat},${l.lng}`,
          language: 'en',
        },
      },
    );
    const region = res.data.plus_code.compound_code.split(', ')[1];
    setCurrentCity(region);
  };

  const setFrom = useCallback((value: string) => {
    changeValue('from', value);
  }, []);
  const setTo = useCallback((value: string) => {
    changeValue('to', value);
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
    setDirections(options);
  }, []);

  const mapProrps = {
    directions,
    setDirections,
    setFrom,
    setTo,
    currentLocation,
  };
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
    currentCity,
  };

  return (
    <>
      <Map {...mapProrps} />
      <OrderForm {...OrderFormProrps} />
    </>
  );
};
