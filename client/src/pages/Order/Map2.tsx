import React, { useEffect, useRef } from 'react';
export const Map2 = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(mapRef.current);
  }, []);

  return <div className="map" ref={mapRef}></div>;
};
