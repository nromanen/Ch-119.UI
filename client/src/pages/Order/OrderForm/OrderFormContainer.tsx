import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useMapActions, useOrderActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { calculatePrice } from '../../../services/orderService';
import { OrderForm } from './OrderForm';

export const OrderFormContainer = () => {
  const cityInfo = useTypedSelector((state) => state.cityInfo);
  const order = useTypedSelector((state) => state.order);
  const { directions, isMapLoaded } = useTypedSelector((state) => state.map);

  const { loading, error, from, to, carType, extraServices, price } = order;
  const { name: currentCity, car_types, extra_services } = cityInfo;

  const { changeOrderValues, makeOrderAction } = useOrderActions();
  const { changeMapValue, getCurrentLocation } = useMapActions();

  const formRef = useRef<any>(null);

  const [fromAutocomplete, setFromAutocomplete] = useState({
    getPlace: () => {},
  });
  const [toAutocomplete, setToAutocomplete] = useState({ getPlace: () => {} });

  const [fromTouched, setFromTouched] = useState(false);
  const [toTouched, setToTouched] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const onFromChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setFrom(e.currentTarget.value);
  };
  const onToChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setTo(e.currentTarget.value);
  };

  const setFrom = useCallback((value: string) => {
    changeOrderValues({ from: value });
  }, []);
  const setTo = useCallback((value: string) => {
    changeOrderValues({ to: value });
  }, []);

  const onFromAutocompleteLoad = (autocomplete: any): void => {
    setFromAutocomplete(autocomplete);
  };
  const onToAutocompleteLoad = (autocomplete: any): void => {
    setToAutocomplete(autocomplete);
  };

  const onFromAutocompleteChanged = (): void => {
    if (fromAutocomplete) {
      const geometry: any = fromAutocomplete.getPlace();
      setFrom(geometry.formatted_address);
      setFromTouched(() => true);
      toTouched && createPath();
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };
  const onToAutocompleteChanged = (): void => {
    if (toAutocomplete) {
      const geometry: any = toAutocomplete.getPlace();

      setTo(geometry.formatted_address);
      setToTouched(true);

      fromTouched && createPath();
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
  }, []);

  useEffect(() => {
    if (cityInfo !== undefined && cityInfo.extra_services !== undefined) {
      const carTypeCoef = cityInfo.car_types.find(
        (carType) => carType.id === order.carType.id,
      )?.city_car_type.coef;

      const servicePrices = order.extraServices.map((serviceId) => {
        return cityInfo.extra_services.find((s) => s.id === serviceId)
          ?.city_service.price;
      });

      const value = {
        initial: cityInfo.basePrice,
        distanceCoef: cityInfo.basePriceForKm,
        carTypeCoef: carTypeCoef,
        services: servicePrices,
        distance: order.distance!.value ? order.distance!.value / 1000 : 0,
        discount: 0,
      };

      const price = calculatePrice(value);

      price && changeOrderValues({ price: price });
    }
  }, [
    cityInfo,
    order.carType,
    order.distance,
    order.extraServices,
    directions,
  ]);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    makeOrderAction();
  };

  const onCarTypeChange = (e: any) => {
    const carType = {
      id: +e.target.selectedOptions[0].dataset.id,
      name: e.target.value,
    };
    changeOrderValues({ carType: carType });
  };

  const onExtraServicesChanged = () => {
    let services: Array<HTMLInputElement> = Array.from(
      formRef.current?.elements.extraServices!,
    );

    services = services.filter((el: HTMLInputElement) => el.checked);

    const extraServices = services.map((el: HTMLInputElement) => {
      return Number(el.dataset.dbId);
    });

    changeOrderValues({ extraServices: extraServices });
  };

  const orderProps = {
    fromValue: from,
    toValue: to,
    onSubmit,
    onCarTypeChange,
    onExtraServicesChanged,
    loading,
    error,
    isMapLoaded,
    formRef,
    selectedCarTypeValue: carType.name,
    avaliableCarTypes: car_types,
    avaliableInCityExtraServices: extra_services,
    activeExtraServices: extraServices,
    currentCity,
    price,
    onFromChangeHandler,
    onToChangeHandler,
    onFromAutocompleteLoad,
    onToAutocompleteLoad,
    onFromAutocompleteChanged,
    onToAutocompleteChanged,
  };

  return <OrderForm {...orderProps} />;
};
