import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
interface Organisation {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  campus: any;
}
interface OrganisationData {
  campuses: Organisation;
}

interface Props {
  id: number;
}

const OrganisationMap = (props: Props) => {

  let mapIcon = L.icon({
    iconUrl: Artevelde.src,
    iconRetinaUrl: Artevelde.src,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
    className: 'rounded-full'
  })

  const organisationData = useQuery(queries.ORGANISATION, {
    variables: {
      id: props.id
    }
  })
    return (
        <MapContainer
          center={[51.0543422, 3.7174243]}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3VycmVhbGlzdG8iLCJhIjoiY2t3eHRzNTJiMGh6dzJ1cDhheG0xNmIxZiJ9.e2VOwXaQoYomBtPSXTOMmQ`}
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
        {
          organisationData.data ?
          <Marker
            key={1}
            position={[organisationData.data.organisationById.latitude, organisationData.data.organisationById.longitude]}
            icon={L.icon({
              iconUrl: organisationData.data.organisationById.logo,
              iconRetinaUrl: organisationData.data.organisationById.logo,
              iconAnchor: [5, 55],
              popupAnchor: [10, -44],
              iconSize: [55, 55],
              className: 'rounded-full border-2 border-primary'
            })}
          >
          </Marker> : ''
        }
        </MapContainer>
      );
};

export default OrganisationMap;
