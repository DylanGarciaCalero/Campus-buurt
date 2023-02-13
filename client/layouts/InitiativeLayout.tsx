import type { NextPage } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Eye from '../images/view.png';
import { useEffect, useState } from 'react';
import React from 'react';
import { LoginInfo } from '../component/auth';
import { useRouter } from 'next/router';
import InitiativeInfo from '../component/initiative/InitiativeInfo';

const InitiativeLayout: NextPage = (props) => {

  return (
    <>
      <div className='max-w-7xl mx-auto flex justify-items-center relative mb-2'>
        <div className='w-full bg-white h-big relative'>
            {props.children}
        </div>
      </div>
    </>
  );
};

export default InitiativeLayout;
