import React from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import InitiativeInfo from '../../component/initiative/InitiativeInfo';
import InitiativeLayout from '../../layouts/InitiativeLayout';

interface Props {}

const SelectedInitiative = (props: Props) => {

  return (
    <div className='bg-secondary m-0 p-0'>
        <Header selected={true}/>
        <InitiativeLayout>
          <InitiativeInfo/>
        </InitiativeLayout>
        <Footer />
    </div>
  );
};

export default SelectedInitiative;
