import React, { useEffect, useRef } from 'react';
export const Map2 = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  let map: google.maps.Map;
  const center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };

  function initMap(): void {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoom: 8,
    });
  }
  useEffect(() => {
    console.log(mapRef.current);
  }, []);

  return <div className="map" ref={mapRef}></div>;
};
