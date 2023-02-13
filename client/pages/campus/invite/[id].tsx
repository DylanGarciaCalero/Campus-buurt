import React from 'react';
import Footer from '../../../component/Footer';
import Header from '../../../component/Header';
import InviteForm from '../../../component/Invite';

interface Props {}

const SelectedCampus = (props: Props) => {

  return (
    <div className='bg-secondary m-0 p-0'>
        <Header selected={true}/>
        <div className=' max-w-7xl m-auto'>
          <InviteForm/>
        </div>
        <Footer />
    </div>
  );
};

export default SelectedCampus;
