import React, { useCallback, useMemo, useState } from 'react';
import { Map } from './Map';
import { useTypedSelector } from './../../../hooks/useTypedSelector';
import { useMapActions, useOrderActions } from './../../../hooks/useActions';

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
  const { changeOrderValue } = useOrderActions();

  const [renderer, setrenderer] = useState<google.maps.DirectionsRenderer>();

  const mapOptions = useMemo(
    () => ({
      center: currentLocation || center,
      zoom: 12,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }],
        },
      ],
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

        console.log(`directions`, directions);

        const origin = directions.routes[0].legs[0].start_address;
        const destination = directions.routes[0].legs[0].end_address;
        const directionRoutes = directions.routes[0].legs[0];
        const distance: google.maps.Distance =
          directionRoutes.distance as google.maps.Distance;

        changeOrderValue('distance', distance);
        changeOrderValue('from', origin);
        changeOrderValue('to', destination);
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
