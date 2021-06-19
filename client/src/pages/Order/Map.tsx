import React, { FC } from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

declare const process: {
  env: {
    REACT_APP_MAP_API_KEY: string;
  };
};

const googleMapsApiKey = process.env.REACT_APP_MAP_API_KEY;

const libraries: Libraries = ['places'];

interface MapProps {
  renderOptions: google.maps.DirectionsRendererOptions | null;
  onDirectionsRendererLoaded: (dirRenderer: any) => void;
  onDirectionsChanged: () => void;
  mapClickHandler: (e: any) => void;
  directionsServiceCallback: (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus,
  ) => void;
  onMapLoaded: (mapInstance: google.maps.Map) => void;
  mapOptions: google.maps.MapOptions;
  directions: google.maps.DirectionsRequest | null;
  mapContainerStyle: any;
  directionsResult?: google.maps.DirectionsResult;
}

export const Map: FC<MapProps> = ({
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
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries: libraries,
  });

  // const directionsServiceLoaded = useCallback((dirService: any) => {
  //   // console.log('dirService', dirService);
  // }, []);

  const renderMap = () => {
    return (
      <GoogleMap
        options={mapOptions}
        onLoad={onMapLoaded}
        mapContainerStyle={mapContainerStyle}
        onClick={mapClickHandler}
      >
        {directions && (
          <DirectionsService
            callback={directionsServiceCallback}
            options={directions}
            // onLoad={directionsServiceLoaded}
          />
        )}
        {directionsResult && renderOptions && (
          <DirectionsRenderer
            onLoad={onDirectionsRendererLoaded}
            options={renderOptions}
            onDirectionsChanged={onDirectionsChanged}
          />
        )}
        {/* {markers.length &&
            markers.map((marker: any, i: number) => (
              <Marker key={`${marker.lat}${marker.lng}`} position={marker} />
            ))} */}

        {/* {currentLocation && (
            <InfoWindow position={currentLocation}>
              <div>
                <p>Your location</p>
              </div>
            </InfoWindow>
          )} */}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
};
