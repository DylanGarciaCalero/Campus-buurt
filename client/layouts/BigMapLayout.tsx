import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import AboutCampus from '../component/AboutCampus';
import Filter from '../component/Filter';
import Eye from '../images/view.png';
import { useEffect, useState } from 'react';
import React from 'react';
import {FiFilter} from 'react-icons/fi'
import {FaRegEye} from 'react-icons/fa'
import Link from 'next/link';
import { CgSearch } from 'react-icons/cg';

const BigMapLayout: NextPage = () => {
  
  const [query, setQuery] = useState<string>('');
  const [queryId, setQueryId] = useState<number>(0);

  const [toggleView, setViewList] = useState<boolean>(false);
  const toggleViewButton = () => {
    toggleView === true ? setViewList(false) : setViewList(true);
  };

  const [mapView, setMapView] = useState<string>('campus');

  const MapWithNoSSR = dynamic(
    () => import('../component/Map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  )

  const ListWithNoSSR = dynamic(
    () => import('../component/List'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>List is getting retrieved</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  )

  return (
    <>
      <div className='max-w-7xl mx-auto flex justify-items-center relative'>
        <div 
          className='w-full h-big relative border-white border-8 z-1'
          id='map'
          >
          { toggleView ? 
          <div className='h-full flex flex-col'>
            <div className=' h-20 flex items-center pl-10 border-b-8 border-b-white'>
              <h3>{mapView === 'organisatie' ? 'Onze organisaties' : 'Onze campussen'}</h3>
            </div>
            <ul className='bg-white w-100 h-full overflow-y-scroll max-h-max'>
              <ListWithNoSSR view={mapView} query={query}/>
            </ul> 
            {/* Search input List view */}
            <div className='flex flex-col items-center gap-2 h-20 w-60 absolute -top-20 left-1/4 border-r-0 z-30'>
              <div className='flex flex-row items-center gap-2'>
                <CgSearch className='h-6 w-1/4'/>
                <input
                  className='p-1 w-3/4 px-2 rounded-2xl'
                  type='text'
                  placeholder={mapView === 'campus' ? 'zoek op campus..' : 'zoek op organisatie..'}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>  
          </div>
          : 
          <MapWithNoSSR view={mapView}/> }
        </div>
        <div className='flex flex-row justify-end absolute top-0 right-0 z-20'>
          {
            toggleView ?
            <Link href="/initiatives" passHref>
            <div className='bg-blue text-sm flex items-center border-8 border-white border-r-0 px-3 text-white cursor-pointer hover:bg-secondary hover:text-black'>
              <p>Bekijk al onze initiatieven</p>
            </div>
          </Link> : ''
          }
          <div className='w-fit h-20 bg-primary border-8 border-white border-r-0 flex flex-col items-center justify-between'>
            <div className='text-sm text-white flex m-auto items-center gap-2'>
              <FiFilter></FiFilter>
              <p>filter {toggleView ? 'lijst' : 'map'}</p>
            </div>
            <div>
              <div className='flex flex-row justify-between items-center h-full gap-2 text-white text-sm'>
                <p onClick={() => setMapView('campus')} className={mapView === 'campus' ? 'bg-white text-primary p-1 cursor-pointer border-2' : 'p-1 cursor-pointer opacity-40'}>Campussen</p>
                <p onClick={() => setMapView('organisatie')} className={mapView === 'organisatie' ? 'bg-white text-primary p-1 cursor-pointer border-2' : 'p-1 cursor-pointer opacity-40'}>Organisaties</p>
              </div>
            </div>
          </div>
          <div
            onClick={toggleViewButton}
            className='flex flex-col justify-end  cursor-pointer h-20'
          >
            <div className='flex flex-col p-3 h-full bg-primary border-white border-8'>
              <div className='w-20 h-6 flex items-center justify-center '>
                <FaRegEye className='w-20 h-6'/>
              </div>
              <h3 className='text-white w-20 h-6 flex items-center justify-center text-sm p-1'>
                {' '}
                {toggleView ? 'Map view' : 'List view'}{' '}
              </h3>
            </div>
          </div>
        </div>
        
      </div>
      <AboutCampus page='home'/>
    </>
  );
};

export default BigMapLayout;
