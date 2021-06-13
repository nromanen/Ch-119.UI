import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
} from '@react-google-maps/api';
import { Badge, ListGroup } from 'react-bootstrap';
import { CurrentLocation } from './Order';
import axios from 'axios';
import { useOrderActions } from '../../hooks/useOrderActions';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
  };
};

const googleMapsApiKey = process.env.REACT_APP_MAP_API_KEY;

type l = ['places'];
const libraries: l = ['places'];

const value = {
  initial: 50,
  carTypeCoef: 1.1,
  services: [10, 15, 20],
  distanceCoef: 10,
  distance: 1.7,
  discount: 10,
};
const calculatePrice = (prices: any) => {
  const servicesPrice = prices.services.reduce(
    (acc: number, val: number) => acc + val,
  );
  return Math.ceil(
    prices.initial +
      prices.distance * prices.distanceCoef * prices.carTypeCoef +
      servicesPrice -
      prices.discount,
  );
};

interface GoogleAPIState {
  isLoaded: boolean;
  loadError: Error | undefined;
}

interface MapProps {
  directions?: any;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setDirections: (v: google.maps.DirectionsRequest) => void;
  currentLocation?: CurrentLocation;
}
const containerStyle = {
  width: '100%',
  height: '50vh',
};

const center = {
  lat: 48.3098624,
  lng: 26.0079615,
};

export const Map: FC<MapProps> = ({
  currentLocation,
  directions,
  setDirections,
  setFrom,
  setTo,
}) => {
  const options = useMemo(
    () => ({
      center: currentLocation || center,
      zoom: 12,
    }),
    [],
  );

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries: libraries,
  });

  const [directionsResult, setDirectionsResult] =
    useState<google.maps.DirectionsResult>();

  const [markers, setMarkers] = useState<Array<any>>([]);
  const [renderer, setRenderer] = useState<any>();

  useEffect(() => {
    if (currentLocation) {
      setMarkers((m: any) => [currentLocation]);
    }
  }, [currentLocation]);

  const directionsServiceCallback = useCallback(
    (
      result: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus,
    ) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirectionsResult(result);
      }
    },
    [],
  );

  // const onLoad = React.useCallback(function onLoad(mapInstance) {
  //   // do something with map Instance
  //   console.log(mapInstance);
  // }, []);

  const mapClickHandler = React.useCallback(async (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const options: google.maps.DirectionsRequest = {
      origin: { lat, lng },
      destination: { lat, lng },
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    };
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          key: process.env.REACT_APP_MAP_API_KEY,
          latlng: `${lat},${lng}`,
          // en or uk
          language: 'en',
        },
      },
    );
    const region = res.data.plus_code.compound_code.split(', ')[1];
    console.log(res.data, 'response');
    console.log(region, 'region');

    setDirections(options);

    // console.log(lat);
    // console.log(lng);
  }, []);

  const onDirectionsChanged = useCallback(
    function gets() {
      // @ts-ignore
      if (renderer) {
        const origin = renderer.directions.routes[0].legs[0].start_address;
        const destination = renderer.directions.routes[0].legs[0].end_address;
        setFrom(origin);
        setTo(destination);
      }
      // console.log(origin);
      // console.log(destination);
    },
    [renderer, directionsResult],
  );

  const directionsServiceLoaded = useCallback((dirService: any) => {
    // console.log('dirService', dirService);
  }, []);

  const onDirectionsRendererLoaded = useCallback((dirRenderer: any) => {
    // console.log('dirRenderer', dirRenderer);
    setRenderer(dirRenderer);
  }, []);

  const renderOptions = useMemo(
    () => ({
      directions: directionsResult,
      draggable: true,
    }),
    [directionsResult],
  );

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that

    return (
      <>
        <GoogleMap
          options={options}
          // onLoad={onLoad}
          mapContainerStyle={containerStyle}
          onClick={mapClickHandler}
        >
          {directions && (
            <DirectionsService
              callback={directionsServiceCallback}
              options={directions}
              onLoad={directionsServiceLoaded}
            />
          )}
          {directionsResult && (
            <DirectionsRenderer
              onLoad={onDirectionsRendererLoaded}
              options={renderOptions}
              onDirectionsChanged={onDirectionsChanged}
            />
          )}
          {markers.length &&
            markers.map((marker: any, i: number) => (
              <Marker key={`${marker.lat}${marker.lng}`} position={marker} />
            ))}

          {/* {currentLocation && (
            <InfoWindow position={currentLocation}>
              <div>
                <p>Your location</p>
              </div>
            </InfoWindow>
          )} */}
        </GoogleMap>

        {directionsResult && (
          <div className="jumbotron">
            <div className="container-fluid">
              <ListGroup>
                <ListGroup.Item>
                  Distance:
                  <Badge variant="primary">
                    {renderer?.directions.routes[0].legs[0].distance.text}
                  </Badge>
                  <span>
                    ({renderer?.directions.routes[0].legs[0].distance.value}m)
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Duration:
                  <Badge variant="primary">
                    {renderer?.directions.routes[0].legs[0].duration.text}
                  </Badge>
                  ({renderer?.directions.routes[0].legs[0].duration.value}s)
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        )}
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
};
