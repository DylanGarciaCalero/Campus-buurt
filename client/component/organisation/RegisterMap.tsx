import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useQuery } from '@apollo/client';
import * as queries from '../../queries';
import React, { useEffect, useState } from 'react';
import Artevelde from '../../images/ah.png';
import L from 'leaflet';
import { useRouter } from 'next/router';

type Location = [number, number];

interface Props {
}

const RegisterMap = (props: Props) => {
    
    let router = useRouter();

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

    let mapIcon = L.icon({
        iconUrl: Artevelde.src,
        iconRetinaUrl: Artevelde.src,
        iconAnchor: [25, 25],
        popupAnchor: [10, -44],
        iconSize: [50, 50],
        className: 'rounded-full border-blue border-4'
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
        });
    }, []);

    const Markers = () => {

        const map = useMapEvents({
            click(e) {                                
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);                
            },            
        })

        return (
            selectedPosition ? 
                <Marker           
                    key={selectedPosition[0]}
                    position={selectedPosition}
                    interactive={false} 
                    icon={mapIcon}
                />
            : null
        )   
        
    }

    return (
        <MapContainer
          center={[51.0543422, 3.7174243]}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
        <Markers />
        <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3VycmVhbGlzdG8iLCJhIjoiY2t3eHRzNTJiMGh6dzJ1cDhheG0xNmIxZiJ9.e2VOwXaQoYomBtPSXTOMmQ`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        </MapContainer>
      );
};

export default RegisterMap;
