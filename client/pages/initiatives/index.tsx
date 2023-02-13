import React from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import InitiativeList from '../../component/initiative/Initiatives';
import InitiativeLayout from '../../layouts/InitiativeLayout';

interface Props {}

const AllInitiatives = (props: Props) => {

  return (
    <div className='bg-secondary m-0 p-0'>
        <Header selected={true}/>
        <InitiativeLayout>
            <InitiativeList/>
        </InitiativeLayout>
        <Footer />
    </div>
  );
};

export default AllInitiatives;
