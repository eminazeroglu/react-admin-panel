import React, {useCallback, useEffect} from 'react';
import {Loader} from "google-maps";

const loader = new Loader(process.env.REACT_APP_MAP_KEY, {});

function GoogleMap({className, lat, lng, zoom = 15, draggable = false, onChange}) {

    const googleMap = async () => {
        try {
            const google = await loader.load();
            let latLng = new google.maps.LatLng(lat || 40.3898364, lng || 49.8512908);
            const map = new google.maps.Map(document.getElementById('google_map'), {
                center: latLng,
                zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            let marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: 'Set lat/lon values for this property',
                draggable
            });

            google.maps.event.addListener(marker, 'dragend', function (a) {
                const value = {
                    lat: a.latLng.lat().toFixed(16),
                    lng: a.latLng.lng().toFixed(16)
                };
                if (onChange) onChange(value)
            });

            google.maps.event.addListener(map, 'click', function (a) {
                let lat = a.latLng.lat();
                let lng = a.latLng.lng();
                let latLng = new google.maps.LatLng(lat, lng);
                map.setCenter(latLng);
                marker.setPosition(latLng);
                const value = {
                    lat: a.latLng.lat().toFixed(16),
                    lng: a.latLng.lng().toFixed(16)
                };
                if (onChange) onChange(value)
            })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        googleMap();
    }, [])

    return (
        <div id="google_map" className={`w-full h-96 ${className || ''}`}/>
    );
}

export default React.memo(GoogleMap);
