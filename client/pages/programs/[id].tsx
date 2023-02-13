import React from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';

interface Props {}

const SelectedOrganisation = (props: Props) => {

  return (
    <div className='bg-secondary m-0 p-0'>
        <Header selected={true}/>
        <div>
            <p>Program type info</p>
        </div>
        <Footer />
    </div>
  );
};

export default SelectedOrganisation;
