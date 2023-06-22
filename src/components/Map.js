import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';


const MapPage = (props) => {

    const mapbox = useRef(null);
    //const { lat, lon, data, PointData, classes } = props;

    useEffect(() => {

        mapboxgl.accessToken = 'pk.eyJ1IjoiZmF0aWhzYWhpbiIsImEiOiJjbGlzdmJheHIxN3MwM2xucXBmOWJ4enRhIn0.3gN7fAJ7aIHBqW0F1jfXnw';


        mapbox.current = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/fatihsahin/cliu4l6e8002501pe72f683vf',
            center: [props.lon, props.lat], // Nilüfer'in koordinatları
            zoom: 12,
            attributionControl: false,
        });
        return () => {
            mapbox.current.remove();
        };
    }, [props.lon, props.lat]);

    useEffect(() => {
        const map = mapbox.current;
        if (props.data && map) {

            const features = props.data.map((obje) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [obje.boylam, obje.enlem],
                },
                properties: {
                    title: 'Otobüs',
                    data: obje,
                },
            }));

            if (map.loaded()) {
                let pointsSource = map.getSource('points');
                if (pointsSource) {
                    // Kaynak zaten mevcut ise verileri güncelle
                    pointsSource.setData({
                        type: 'FeatureCollection',
                        features: features,
                    });
                } else {
                    // Kaynak henüz eklenmemiş ise ekle
                    map.addSource('points', {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: features,
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
                            'text-color': '#0ef418',
                        },
                    });

                    const layers = map.getStyle().layers;
                    const labelLayerId = layers.find(
                        (layer) => layer.type === 'symbol' && layer.layout['text-field']
                    ).id;

                    map.addLayer(
                        {
                            'id': 'add-3d-buildings',
                            'source': 'composite',
                            'source-layer': 'building',
                            'filter': ['==', 'extrude', 'true'],
                            'type': 'fill-extrusion',
                            'minzoom': 15,
                            'paint': {
                                'fill-extrusion-color': '#aaa',

                                // Use an 'interpolate' expression to
                                // add a smooth transition effect to
                                // the buildings as the user zooms in.
                                'fill-extrusion-height': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    15,
                                    0,
                                    15.05,
                                    ['get', 'height']
                                ],
                                'fill-extrusion-base': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    15,
                                    0,
                                    15.05,
                                    ['get', 'min_height']
                                ],
                                'fill-extrusion-opacity': 0.6
                            }
                        },
                        labelLayerId
                    );

                    map.on('click', (e) => {
                        const features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
                        if (features.length > 0) {
                            props.PointData(JSON.parse(features[0].properties.data));
                        }
                    });
                }

            }
        }
    }, [props.data]);


    return (
        <>
            <div id="map" className={props.classes} />
        </>
    );
};

export default MapPage;


//pk.eyJ1IjoiZmF0aWhzYWhpbiIsImEiOiJjbGlzdmJheHIxN3MwM2xucXBmOWJ4enRhIn0.3gN7fAJ7aIHBqW0F1jfXnw


/*

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MapPage = (props) => {


    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZmF0aWhzYWhpbiIsImEiOiJjbGlzdmJheHIxN3MwM2xucXBmOWJ4enRhIn0.3gN7fAJ7aIHBqW0F1jfXnw';

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/fatihsahin/cliu4l6e8002501pe72f683vf',
            center: [props.lon, props.lat], // Nilüfer'in koordinatları
            zoom: 12,
            attributionControl: false,
        });

        console.log(props.data)
        if (props.data)
            map.on('load', () => {
                map.loadImage(
                    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                    (error, image) => {
                        if (error) throw error;
                        map.addImage('custom-marker', image);

                        const features = props.data.map((obje) => ({
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [obje.boylam, obje.enlem],
                            },
                            properties: {
                                title: 'Otobüs',
                                data: obje
                            },
                        }));

                        map.addSource('points', {
                            type: 'geojson',
                            data: {
                                type: 'FeatureCollection',
                                features: features,
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

                        // Tıklanma olayını yakala
                        map.on('click', (e) => {
                            const features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
                            if (features.length > 0) {
                                //console.log(features[0].properties.title);
                                //console.log(JSON.parse(features[0].properties.data));
                                props.PointData(JSON.parse(features[0].properties.data));
                            }
                        });


                    }
                );
            })


        // Clean up the map instance when the component unmounts
        return () => {
            map.remove();
        };
    }, [props.data]);

    return (
        <>
            <div id="map" className={props.class} />
        </>
    );
};

export default MapPage;
*/