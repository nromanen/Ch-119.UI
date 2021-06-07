import { useState, useCallback } from 'react';
import { Map } from './Map';
import { OrderForm } from './OrderForm';

export const Order = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsRequest>();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [map, setMap] = useState<google.maps.Map>();

  const [fromAutocomplete, setFromAutocomplete] = useState({
    getPlace: () => {},
  });
  const [toAutocomplete, setToAutocomplete] = useState({ getPlace: () => {} });

  const onFromAutocompleteLoad = (autocomplete: any): void => {
    console.log('autocomplete: ', autocomplete);

    setFromAutocomplete(autocomplete);
  };
  const onToAutocompleteLoad = (autocomplete: any): void => {
    console.log('autocomplete: ', autocomplete);

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

  const createPath = (): void => {
    const options: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    };
    console.log(options, 'options');

    setDirections(options);
  };

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
  };

  return (
    <>
      <Map {...mapProrps} />
      <OrderForm {...OrderFormProrps} />
    </>
  );
};
