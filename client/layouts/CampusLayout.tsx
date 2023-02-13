import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import React from 'react';
import CampusInfo from '../component/campus/CampusInfo';
import { useRouter } from 'next/router';
import CampusPrograms from '../component/campus/CampusPrograms';

const CampusLayout: NextPage = () => {

  const router = useRouter();
  const id:number = parseInt(router.query.id as string, 10);

  const [toggleView, setViewList] = useState(false);
  const toggleViewButton = () => {
    toggleView === true ? setViewList(false) : setViewList(true);
    console.log(toggleView);
  };

  const MapWithNoSSR = dynamic(
    () => import('../component/campus/CampusMap'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  )
  
  return (
    <>
      <div className='max-w-7xl mx-auto flex justify-items-center gap-2 relative'>
        <div className='w-8/12 bg-white min-h-big h-fit relative'>
            <CampusInfo/>
        </div>

        <div 
          className='w-4/12 h-fit relative flex flex-col'
          id='map'
          >
          <MapWithNoSSR id={id}/>
          <CampusPrograms/>
        </div>
      </div>
    </>
  );
};

export default CampusLayout;
