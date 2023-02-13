import { MapContainer, TileLayer, Marker, Popup, Polyline, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useQuery } from '@apollo/client';
import * as queries from '../../queries';
import React, { useEffect, useState } from 'react';
import Artevelde from '../../images/ah.png';
import L, { latLngBounds } from 'leaflet';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Location = [number, number];
interface Campus {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  campus: any;
  organisation: Organisation;
}

interface Organisation {
  id: number;
  name: string;
  logo: string;
  latitude: number;
  longitude: number;
}
interface CampusData {
  campuses: Campus[];
}

interface Props {
  id: number
}

const Map = (props: Props) => {

  const selectedCampus = useQuery<Campus>(queries.CAMPUS_DATA, {
    variables: {
        id:props.id
    }
  });

  const [selectedId, setSelectedId] = useState<number>(0);
  const router = useRouter();

  if (selectedId !== 0) {
    router.push(
      {
        pathname: '/campus/'+selectedId,
      }
    )
  }

  let mapIcon = L.icon({
    iconUrl: Artevelde.src,
    iconRetinaUrl: Artevelde.src,
    iconAnchor: [27.5, 27.5],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
    className: 'rounded-full border-4 border-primary'
  })

  let markerBounds = latLngBounds([])

if (!selectedCampus.loading && selectedCampus.data) {
    return (
      <div className='h-big border-white border-8 z-0'>
        <MapContainer
          bounds={markerBounds}
          zoom={15}
          center={[selectedCampus.data.campus.latitude, selectedCampus.data.campus.longitude]}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3VycmVhbGlzdG8iLCJhIjoiY2t3eHRzNTJiMGh6dzJ1cDhheG0xNmIxZiJ9.e2VOwXaQoYomBtPSXTOMmQ`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          
          <Marker
                key={selectedCampus.data.campus.id}
                position={[selectedCampus.data.campus.latitude, selectedCampus.data.campus.longitude]}
                draggable={false}
                icon={mapIcon}
              >
                <Popup>{selectedCampus.data.campus.name}</Popup>
            </Marker>
            {
              selectedCampus.data.campus.initiatives.map((campus:Campus) => {
                markerBounds.extend([campus.organisation.latitude, campus.organisation.longitude]);
                return (
                  <>
                  {
                    selectedCampus.data ?
                    <Polyline pathOptions={{color: 'orange', opacity: 0.5, dashArray:[10,10]}} positions={[[selectedCampus.data.campus.latitude, selectedCampus.data.campus.longitude],[campus.organisation.latitude, campus.organisation.longitude]]} />
                    : ''
                  }
                  <Marker
                      key={campus.organisation.id}
                      position={[campus.organisation.latitude, campus.organisation.longitude]}
                      draggable={false}
                      icon={
                        L.icon({
                        iconUrl: campus.organisation.logo,
                        iconRetinaUrl: campus.organisation.logo,
                        iconAnchor: [27.5, 27.5],
                        popupAnchor: [10, -44],
                        iconSize: [55, 55],
                        className: ' rounded-full border-4 border-primary'
                      })}
                    >
                      <Popup>{campus.organisation.name}</Popup>
                  </Marker>
                  </>
                )
              })
            }
        </MapContainer>
        </div>
      );
} else {
    return (
        <div>A map is loading</div>
    )
}
};

export default Map;
