/* eslint-disable react/display-name */
import Link from 'next/link';
import Nav from './Nav';
import { IoLogoSlack } from 'react-icons/io';
import React from 'react';
interface Selected {
  selected?: boolean;
}

const Header = (selected: Selected) => {
  return (
    <header className='flex justify-between max-w-7xl mx-auto py-6'>
      <div className='w-3/12 flex mr-2 items-center gap-2'>
        <Link href='/' passHref>
          <IoLogoSlack className='text-primary w-20 h-20 cursor-pointer' />
        </Link>
        <h2 className=''>Campus in de buurt</h2>
      </div>
      <div className='w-12/12 flex'>
        <div className='w-4/4 grid grid-flow-row flex-row justify-items-end'>
          <Link href={'/register/organisation'} passHref>
            <div className='flex items-center justify-center mb-2 bg-primary py-1 px-2 rounded-2xl'>
              <h3>Registreren als organisatie</h3>
          </div>
          </Link>
          <div className='grid justify-items-end'>
            <Nav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
