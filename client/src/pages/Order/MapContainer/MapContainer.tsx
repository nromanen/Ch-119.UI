import React from 'react';
import { Map } from './../Map';
import { useTypedSelector } from './../../../hooks/useTypedSelector';

export const MapContainer = () => {
  const { directions } = useTypedSelector((state) => state.map);
  const mapProrps = {
    // directions,
    // center,
    // onMapLoaded,
    // onDirectionsChanged,
    // onDirectionsRendererLoaded,
  };
  // return <Map></Map>;
};
