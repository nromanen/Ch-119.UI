import { FC } from 'react';
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

import './Map.scss';

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
  mapOptions: any;
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

  const renderMap = () => {
    return (
      <div className="map">
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
            />
          )}
          {directionsResult && renderOptions && (
            <DirectionsRenderer
              onLoad={onDirectionsRendererLoaded}
              options={renderOptions}
              onDirectionsChanged={onDirectionsChanged}
            />
          )}
        </GoogleMap>
      </div>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <div>Loading...</div>;
};
