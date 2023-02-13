import React from 'react';
import Footer from '../../../../component/Footer';
import Header from '../../../../component/Header';
import InitiativeForm from '../../../../component/initiative/InitiativeForm';
import CampusLayout from '../../../../layouts/CampusLayout';

interface Props {}

const CreateInitiative = (props: Props) => {

  return (
    <div className='bg-secondary m-0 p-0'>
        <Header selected={true}/>
            <div className='max-w-7xl m-auto'>
                <InitiativeForm/>
            </div>
        <Footer />
    </div>
  );
};

export default CreateInitiative;
