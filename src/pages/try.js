// pages/map.js

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapPage = () => {

    useEffect(() => {
        console.log("hi");
      
        mapboxgl.accessToken = 'pk.eyJ1IjoiZmF0aWhzYWhpbiIsImEiOiJjbGlzdmJheHIxN3MwM2xucXBmOWJ4enRhIn0.3gN7fAJ7aIHBqW0F1jfXnw';
      
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [28.9888171, 40.206364], // Nilüfer'in koordinatları
          zoom: 12,
        });
      
        map.on('load', () => {
          map.loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            (error, image) => {
              if (error) throw error;
              map.addImage('custom-marker', image);
              map.addSource('points', {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: [28.9888171, 40.206364],
                      },
                      properties: {
                        title: 'Nilüfer',
                      },
                    },
                  ],
                },
              });
      
              map.addLayer({
                id: 'points',
                type: 'symbol',
                source: 'points',
                layout: {
                  'icon-image': 'custom-marker',
                  'text-field': ['get', 'title'],
                  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                  'text-offset': [0, 1.25],
                  'text-anchor': 'top',
                },
                paint: {
                  "text-color": "#ffffff"
                }
              });
            }
          );
        });
      
        // Clean up the map instance when the component unmounts
        return () => {
          map.remove();
        };
      }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default MapPage;

//pk.eyJ1IjoiZmF0aWhzYWhpbiIsImEiOiJjbGlzdmJheHIxN3MwM2xucXBmOWJ4enRhIn0.3gN7fAJ7aIHBqW0F1jfXnw