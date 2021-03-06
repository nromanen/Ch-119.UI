import React, { useCallback, useMemo, useState } from 'react';
import { Map } from './Map';
import { useTypedSelector } from './../../../hooks/useTypedSelector';
import { useMapActions, useOrderActions } from './../../../hooks/useActions';
import { dark } from './MapThemes';

const mapContainerStyle = {
  width: '100%',
  height: '90vh',
};

const center = {
  lat: 48.3098624,
  lng: 26.0079615,
};

export const MapContainer = () => {
  const { directions, directionsResult, currentLocation } = useTypedSelector(
    (state) => state.map,
  );
  const { changeMapValue } = useMapActions();
  const { changeOrderValues } = useOrderActions();

  const [renderer, setrenderer] = useState<google.maps.DirectionsRenderer>();

  const mapOptions = useMemo(
    () => ({
      center: currentLocation || center,
      zoom: 12,
      styles: dark,
    }),
    [],
  );

  const directionsServiceCallback = useCallback(
    (
      result: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus,
    ) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        changeMapValue('directionsResult', result);
      }
    },
    [],
  );

  const onMapLoaded = React.useCallback(function onLoad(mapInstance) {
    changeMapValue('isMapLoaded', true);
  }, []);

  const mapClickHandler = React.useCallback(async (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const options: google.maps.DirectionsRequest = {
      origin: { lat, lng },
      destination: { lat, lng },
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    };

    changeMapValue('directions', options);
  }, []);

  const onDirectionsChanged = useCallback(
    function gets() {
      if (renderer) {
        const directions =
          renderer.getDirections() as google.maps.DirectionsResult;

        const origin = directions.routes[0].legs[0].start_address;
        const destination = directions.routes[0].legs[0].end_address;
        const directionRoutes = directions.routes[0].legs[0];
        const distance: google.maps.Distance =
          directionRoutes.distance as google.maps.Distance;
        changeOrderValues({
          distance: distance,
          from: origin,
          to: destination,
        });
      }
    },
    [renderer, directionsResult],
  );

  const onDirectionsRendererLoaded = useCallback((dirRenderer: any) => {
    setrenderer(dirRenderer);
  }, []);

  const renderOptions = useMemo(
    () => ({
      directions: directionsResult,
      draggable: true,
      preserveViewport: true,
    }),
    [directionsResult],
  );

  const mapProps = {
    renderOptions,
    onDirectionsRendererLoaded,
    onDirectionsChanged,
    mapClickHandler,
    directionsServiceCallback,
    onMapLoaded,
    mapOptions,
    directions,
    directionsResult,
    mapContainerStyle,
  };
  return <Map {...mapProps}></Map>;
};
