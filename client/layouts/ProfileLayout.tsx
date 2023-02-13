import type { NextPage } from 'next';
import React from 'react';

const ProfileLayout: NextPage = (props) => {

  return (
    <>
      <div className='max-w-7xl mx-auto flex justify-items-center mb-2 relative'>
        <div className='w-full bg-white h-big relative'>
            {props.children}
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
