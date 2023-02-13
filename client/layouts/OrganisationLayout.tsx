import type { NextPage } from 'next';
import React from 'react';
import { LoginInfo } from '../component/auth';
import OrganisationInfo from '../component/organisation/OrganisationInfo';

const OrganisationLayout: NextPage = () => {

  return (
    <>
      <div className='max-w-7xl mx-auto flex justify-items-center relative'>
        <div className='w-full bg-white h-big relative'>
            <OrganisationInfo />
        </div>
      </div>
    </>
  );
};

export default OrganisationLayout;
