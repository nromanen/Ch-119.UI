import { useState, useCallback, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Map } from './Map';
import { OrderForm } from './OrderForm';
import { useActions } from './../../hooks/useActions';
import axios from 'axios';
import { getCityInfo } from './mapService';

export interface CurrentLocation {
  lat: number;
  lng: number;
}

export const Order = () => {
  console.log('render Order');

  const [directions, setDirections] = useState<google.maps.DirectionsRequest>();

  const [fromAutocomplete, setFromAutocomplete] = useState({
    getPlace: () => {},
  });
  const [toAutocomplete, setToAutocomplete] = useState({ getPlace: () => {} });

  const { from, to } = useTypedSelector((state) => state.order);
  const { changeValue } = useActions();

  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>();
  const [currentCity, setCurrentCity] = useState<string>();
  const [info, setInfo] = useState<any>({
    car_types: [],
    extra_services: [],
  });

  useEffect(() => {
    getCurrentLocation();
    getCityInfo().then((res) => {
      setInfo(res);
    });
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
          language: 'uk',
        },
      },
    );
    console.log(res.data, 'response From GOOGLE API');
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
      console.log(geometry, 'from geometry');

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
    console.log(options, 'options');

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
    carTypes: info.car_types,
    extraServices: info.extra_services,
    currentCity,
  };

  return (
    <>
      <Map {...mapProrps} />
      <OrderForm {...OrderFormProrps} />
    </>
  );
};
