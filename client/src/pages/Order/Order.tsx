import { useState, useCallback } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Map } from './Map';
import { OrderForm } from './OrderForm';
import { useActions } from './../../hooks/useActions';

export const Order = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsRequest>();
  const [map, setMap] = useState<google.maps.Map>();

  const [fromAutocomplete, setFromAutocomplete] = useState({
    getPlace: () => {},
  });
  const [toAutocomplete, setToAutocomplete] = useState({ getPlace: () => {} });

  const { from, to } = useTypedSelector((state) => state.order);
  const { changeValue } = useActions();
  const setFrom = (value: string) => {
    changeValue('from', value);
  };
  const setTo = (value: string) => {
    changeValue('to', value);
  };

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
