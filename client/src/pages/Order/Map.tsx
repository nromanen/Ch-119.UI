import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
// import { Badge, ListGroup } from 'react-bootstrap';
import { CurrentLocation } from './Order';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
  };
};

const googleMapsApiKey = process.env.REACT_APP_MAP_API_KEY;

type l = ['places'];
const libraries: l = ['places'];

// const extraServices = [
//   {
//     name: 'English speaking',
//   },
//   {
//     name: 'Silent driver',
//   },
//   {
//     name: 'Baby chair',
//   },
// ]

// const value = {
//   initial: 50,
//   carTypeCoef: 1.1,
//   services: [10, 15, 20],
//   distanceCoef: 10,
//   distance: 1.7,
//   discount: 10,
// };
// const calculatePrice = (prices: any) => {
//   const servicesPrice = prices.services.reduce(
//     (acc: number, val: number) => acc + val,
//   );
//   return Math.ceil(
//     prices.initial +
//       prices.distance * prices.distanceCoef * prices.carTypeCoef +
//       servicesPrice -
//       prices.discount,
//   );
// };

interface MapProps {
  directions?: any;
  onMapLoaded: (map: google.maps.Map) => void;
  map?: google.maps.Map;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setDirections: (v: google.maps.DirectionsRequest) => void;
  currentLocation?: CurrentLocation;
}

export const Map: FC<MapProps> = ({
  directions,
  onMapLoaded,
  setFrom,
  setTo,
  setDirections,
  currentLocation,
}) => {
  const containerStyle = {
    width: '100%',
    height: '50vh',
  };

  const center = {
    lat: 48.3098624,
    lng: 26.0079615,
  };
  const options = {
    center,
    zoom: 12,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey, // ,
    libraries: libraries,
    // ...otherOptions
  });

  const [directionsResult, setDirectionsResult] =
    useState<google.maps.DirectionsResult>();
  const [markers, setMarkers] = useState<Array<any>>([]);

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
      console.log('result', result);

      console.log('status', status);
      if (status !== window.google.maps.DirectionsStatus.OK) {
        return;
      }
      //
      setDirectionsResult(result);
    },
    [],
  );

  const onLoad = React.useCallback(function onLoad(mapInstance) {
    // do something with map Instance
    onMapLoaded(mapInstance);
  }, []);

  const mapClickHandler = (e: any) => {
    console.log(e);
    console.log(e.latLng);
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log(lat);
    console.log(lng);
    // setMarkers((markers: any) => [...markers, { lat, lng }])
  };

  const onDirectionsChanged = useCallback(function gets() {
    // @ts-ignore
    const that: any = this;
    const origin = that.directions.routes[0].legs[0].start_address;
    const destination = that.directions.routes[0].legs[0].end_address;
    // setFrom(origin);
    // setTo(destination);
    console.log(origin);
    console.log(destination);
    console.log(directionsResult, 'directionsResult');

    // const geocoder = new google.maps.Geocoder()
  }, []);

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that

    return (
      <>
        <GoogleMap
          options={options}
          onLoad={onLoad}
          mapContainerStyle={containerStyle}
          onClick={mapClickHandler}
        >
          {directions && (
            <DirectionsService
              callback={directionsServiceCallback}
              options={directions}
            />
          )}
          {directionsResult && (
            <DirectionsRenderer
              options={{
                directions: directionsResult,
                draggable: true,
              }}
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

        {/* {directionsResult && (
          <div className="jumbotron">
            <div className="container-fluid">
              <ListGroup>
                <ListGroup.Item>
                  Distance:
                  <Badge variant="primary">
                    {directionsResult.routes[0].legs[0].distance.text}
                  </Badge>
                  <span>
                    ({directionsResult.routes[0].legs[0].distance.value}m)
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Duration:
                  <Badge variant="primary">
                    {directionsResult.routes[0].legs[0].duration.text}
                  </Badge>
                  ({directionsResult.routes[0].legs[0].duration.value}s)
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        )} */}
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
};
