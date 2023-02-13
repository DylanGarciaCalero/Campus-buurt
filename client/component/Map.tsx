import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useQuery } from '@apollo/client';
import * as queries from '../queries';
import React, { useEffect, useState } from 'react';
import Artevelde from '../images/ah.png';
import L, { latLngBounds, map } from 'leaflet';
import { useRouter } from 'next/router';
import { FaUniversity } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import {CgSearch} from 'react-icons/cg'

type Location = [number, number];
interface Campus {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}
interface CampusData {
  campuses: Campus[];
}

interface Organisation {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  logo: string;
  description: string;
}

interface OrganisationData {
  organisations: Organisation[];
}

interface Props {
  view?: string
}

const Map = (props: Props) => {

  const campusses = useQuery<CampusData>(queries.CAMPUSES_MAP);
  const organisations = useQuery<OrganisationData>(queries.ORGANISATIONS);

  const [selectedCampusId, setSelectedCampusId] = useState<number>(0);
  const [selectedOrgId, setSelectedOrgId] = useState<number>(0);
  const [hoveredItem, setHoveredItem] = useState({id:0, name:"", description:"", logo:""})
  
  const [query, setQuery] = useState<string>('');
  const [queryId, setQueryId] = useState<number>(0);
  const [amountResults, setAmountResults] = useState<number>();

  const { id, name, description, logo } = hoveredItem;

  const router = useRouter();

  let mapCenter:Location = [51.0543422, 3.7174243]

  function handleQuery(id:number) {
    setQueryId(id),
    setQuery('');
  }

  if (queryId !== 0) {
    if (props.view === 'campus') {
      let path = "/campus/" + queryId;
      router.push(path)
    } else if (props.view === 'organisatie') {
      let path = "/organisation/" + queryId;
      router.push(path)
    }
  }
  

  if (selectedCampusId !== 0) {
    router.push(
      {
        pathname: '/campus/'+selectedCampusId,
      }
    )
  }
  if (selectedOrgId !== 0) {
    router.push(
      {
        pathname: '/organisation/'+selectedOrgId,
      }
    )
  }


  let mapIcon = L.icon({
    iconUrl: Artevelde.src,
    iconRetinaUrl: Artevelde.src,
    iconAnchor: [5, 5],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
    className: 'rounded-full border-4 border-primary'
  })

  let selectedMapIcon = L.icon({
    iconUrl: Artevelde.src,
    iconRetinaUrl: Artevelde.src,
    iconAnchor: [5, 5],
    popupAnchor: [10, -44],
    iconSize: [55, 55],
    className: 'rounded-full border-4 border-blue'
  })

  let deSelectedMapIcon = L.icon({
    iconUrl: Artevelde.src,
    iconRetinaUrl: Artevelde.src,
    iconAnchor: [1, 1],
    popupAnchor: [10, -44],
    iconSize: [20, 20],
    className: 'rounded-full border-4 border-primary opacity-20'
  })

  let markerBounds = latLngBounds([])

  return (
    <>
      <MapContainer
        center={mapCenter}
        markerZoomAnimation
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex:0 }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3VycmVhbGlzdG8iLCJhIjoiY2t3eHRzNTJiMGh6dzJ1cDhheG0xNmIxZiJ9.e2VOwXaQoYomBtPSXTOMmQ`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {
          props.view === 'campus' 
          ? 
          !campusses.loading &&
            campusses.data &&
            campusses.data.campuses.map((campus: Campus) => {
              return (
              query !== '' && props.view === 'campus' && query.length > 1 && campus.name.includes(query) ? 
              <Marker
                    key={campus.id}
                    position={[campus.latitude, campus.longitude]}
                    draggable={false}
                    icon={selectedMapIcon}
                    riseOnHover={true}
                    eventHandlers={{
                      click: () => {
                        setSelectedCampusId(campus.id);
                      },
                      mouseover: () => {
                        setHoveredItem({
                          id: campus.id,
                          name: campus.name,
                          description: campus.description,
                          logo:""
                        })
                      },
                      mouseout: () => {
                        setHoveredItem({id:0, name:"", description:"", logo:""})
                      }
                    }}
                  >
                  </Marker> : query !== '' && props.view === 'campus' && !campus.name.includes(query) ?
                  <Marker
                    key={campus.id}
                    position={[campus.latitude, campus.longitude]}
                    draggable={false}
                    icon={deSelectedMapIcon}
                    riseOnHover={true}
                    eventHandlers={{
                      click: () => {
                        setSelectedCampusId(campus.id);
                      },
                      mouseover: () => {
                        setHoveredItem({
                          id: campus.id,
                          name: campus.name,
                          description: campus.description,
                          logo:""
                        })
                      },
                      mouseout: () => {
                        setHoveredItem({id:0, name:"", description:"", logo:""})
                      }
                    }}
                  >
                  </Marker> : props.view === 'campus' ?
                  <Marker
                  key={campus.id}
                  position={[campus.latitude, campus.longitude]}
                  draggable={false}
                  icon={mapIcon}
                  riseOnHover={true}
                  eventHandlers={{
                    click: () => {
                      setSelectedCampusId(campus.id);
                    },
                    mouseover: () => {
                      setHoveredItem({
                        id: campus.id,
                        name: campus.name,
                        description: campus.description,
                        logo:""
                      })
                    },
                    mouseout: () => {
                      setHoveredItem({id:0, name:"", description:"", logo:""})
                    }
                  }}
                >
                </Marker> : ''

              );
            })
            : props.view === 'organisatie'
            ?
          !organisations.loading &&
          organisations.data &&
          organisations.data.organisations.map((organisation:Organisation) => {
            return (
              query !== '' && props.view === 'organisatie' && query.length > 1 && organisation.name.includes(query) ? 
              <Marker
                key={organisation.id}
                position={[organisation.latitude, organisation.longitude]}
                draggable={false}
                icon={
                  L.icon({
                  iconUrl: organisation.logo,
                  iconRetinaUrl: organisation.logo,
                  iconAnchor: [5, 5],
                  popupAnchor: [10, -44],
                  iconSize: [55, 55],
                  className: 'rounded-full border-4 border-blue'
                })}
                eventHandlers={{
                  click: () => {
                    setSelectedOrgId(organisation.id);
                  },
                  mouseover: () => {
                    setHoveredItem({
                      id: organisation.id,
                      name: organisation.name,
                      description: organisation.description,
                      logo: organisation.logo
                    })
                  },
                  mouseout: () => {
                    setHoveredItem({id:0, name:"", description:"", logo:""})
                  }
                }}
              >
              </Marker> : query !== '' && props.view === 'organisatie' && !organisation.name.includes(query) ?
              <Marker
              key={organisation.id}
              position={[organisation.latitude, organisation.longitude]}
              draggable={false}
              icon={
                L.icon({
                iconUrl: organisation.logo,
                iconRetinaUrl: organisation.logo,
                iconAnchor: [1, 1],
                popupAnchor: [10, -44],
                iconSize: [20, 20],
                className: 'rounded-full border-4 border-primary opacity-20'
              })}
              eventHandlers={{
                click: () => {
                  setSelectedOrgId(organisation.id);
                },
                mouseover: () => {
                  setHoveredItem({
                    id: organisation.id,
                    name: organisation.name,
                    description: organisation.description,
                    logo: organisation.logo
                  })
                },
                mouseout: () => {
                  setHoveredItem({id:0, name:"", description:"", logo:""})
                }
              }}
            >
            </Marker> : props.view === 'organisatie' ?
            <Marker
            key={organisation.id}
            position={[organisation.latitude, organisation.longitude]}
            draggable={false}
            icon={
              L.icon({
              iconUrl: organisation.logo,
              iconRetinaUrl: organisation.logo,
              iconAnchor: [1, 1],
              popupAnchor: [10, -44],
              iconSize: [55, 55],
              className: 'rounded-full border-4 border-primary'
            })}
            eventHandlers={{
              click: () => {
                setSelectedOrgId(organisation.id);
              },
              mouseover: () => {
                setHoveredItem({
                  id: organisation.id,
                  name: organisation.name,
                  description: organisation.description,
                  logo: organisation.logo
                })
              },
              mouseout: () => {
                setHoveredItem({id:0, name:"", description:"", logo:""})
              }
            }}
          >
          </Marker> : ''
            );
          })
          :
          console.log('something went wrong')
        }
      </MapContainer>
      {
        id !== 0 ?
        <div className='absolute flex flex-col justify-between items-center bg-black bg-opacity-60 border-8 border-white border-opacity-100 -bottom-2 -left-2 w-1/4 h-1/2'>
          <div className='h-1/2 flex flex-col items-center justify-center text-white'>
            {
              logo !== "" ? <Image src={logo} className='w-40 h-40 rounded-full' width={100} height={100}/> :
              <FaUniversity className='h-40 w-40 p-5 text-white'/>
            }
          </div>
          <div className='h-1/2 max-w-4/5 text-white flex flex-col text-center'>
            <p className='w-4/5 border-b-4 mx-auto text-primary border-b-white pb-2 mb-2'>{name}</p>
            <p className='w-4/5 mx-auto'>"{description}"</p>
          </div>
        </div> : ""
      }
      <Link href="/initiatives" passHref>
      <div className='absolute z-30 bottom-5 right-1 h-12 w-80 bg-blue flex items-center justify-center border-white border-4 text-white cursor-pointer hover:bg-secondary hover:text-black'>
        <p>Bekijk al onze initiatieven</p>
      </div>
      </Link>
      <div className='flex flex-col items-center gap-2 h-20 w-60 absolute -top-20 left-1/4 border-r-0 z-30'>
        <div className='flex flex-row items-center gap-2'>
          <CgSearch className='h-6 w-1/4 flex items-center justify-center'/>
          <input
            className='p-1 w-3/4 px-2 rounded-2xl'
            type='text'
            placeholder={props.view === 'campus' ? 'zoek op campus..' : 'zoek op organisatie..'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className='flex flex-col gap-1 w-3/4 items-end ml-auto'>
          {
            props.view === 'campus' ? 
            !campusses.loading &&
            campusses.data &&
            campusses.data.campuses.map((campus: Campus) => {
              return (
              campus.name.includes(query) && query !== '' && query.length > 1 ? <li onClick={() => handleQuery(campus.id)} className='cursor-pointer hover:bg-primary w-full px-2 p-1 text-white rounded-2xl bg-blue'>{campus.name}</li> : ""
              )
            }) : props.view === 'organisatie' ? 
            !organisations.loading &&
            organisations.data &&
            organisations.data.organisations.map((organisation: Organisation) => {
              return (
              organisation.name.includes(query) && query !== '' && query.length > 1 ? <li onClick={() => handleQuery(organisation.id)} className='cursor-pointer hover:bg-primary w-full px-2 p-1 text-white rounded-2xl bg-blue'>{organisation.name}</li> : ""
              )
            }) : ''
          }
        </ul>
      </div>
    </>
  );
};

export default Map;
