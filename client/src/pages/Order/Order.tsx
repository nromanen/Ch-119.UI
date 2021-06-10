import { useState, useCallback, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Map } from './Map';
import { OrderForm } from './OrderForm';
import { useActions } from './../../hooks/useActions';
import axios from 'axios';

export interface CurrentLocation {
  lat: number;
  lng: number;
}

export const Order = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsRequest>();
  const [map, setMap] = useState<google.maps.Map>();

  const [fromAutocomplete, setFromAutocomplete] = useState({
    getPlace: () => {},
  });
  const [toAutocomplete, setToAutocomplete] = useState({ getPlace: () => {} });

  const { from, to } = useTypedSelector((state) => state.order);
  const { changeValue } = useActions();

  interface Info {}

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

  const getCityInfo = async (name = 'Чернівці') => {
    console.log('get info');

    const res = await axios.get(`${process.env.REACT_APP_HOST}info`, {
      params: {
        name,
      },
    });

    if (res.statusText === 'OK') {
      console.log(res, 'info');
      return res.data.data;
    }
  };

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
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${l.lat},${l.lng}&key=${process.env.REACT_APP_MAP_API_KEY}`,
    );
    console.log(res.data, 'response From GOOGLE API');
    setCurrentCity(res.data.plus_code.compound_code);
  };

  const setFrom = (value: string) => {
    changeValue('from', value);
  };
  const setTo = (value: string) => {
    changeValue('to', value);
  };

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
  }, [from, to]);

  const onMapLoaded = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const mapProrps = {
    directions,
    setDirections,
    onMapLoaded,
    map,
    setFrom,
    setTo,
    currentLocation,
  };
  const OrderFormProrps = {
    from,
    setFrom,
    to,
    setTo,
    map,
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
