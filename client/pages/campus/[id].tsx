import React from 'react';
import { LoginInfo } from '../../component/auth';
import CampusPrograms from '../../component/campus/CampusPrograms';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import CampusLayout from '../../layouts/CampusLayout'

interface Props {}

const SelectedCampus = (props: Props) => {

  return (
    <div className='bg-secondary m-0 p-0'>
        <Header selected={true}/>
          <CampusLayout/>
        <Footer />
    </div>
  );
};

export default SelectedCampus;
