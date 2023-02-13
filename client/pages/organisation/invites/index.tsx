/* eslint-disable react/no-unescaped-entities */
import { useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Footer from '../../../component/Footer';
import Header from '../../../component/Header';
import InviteInfo from '../../../component/organisation/InviteInfo';
import * as queries from '../../../queries';

interface Props {}

const OrganisationInvites = (props: Props) => {
  

  return (
    <div className='bg-secondary m-0 p-0'>
      <Header selected={true} />
      <div className='max-w-7xl m-auto'>
        <div>
          <InviteInfo/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrganisationInvites;
