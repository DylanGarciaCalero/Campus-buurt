import React from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import OrganisationLayout from '../../layouts/OrganisationLayout';

interface Props {}

const SelectedOrganisation = (props: Props) => {

  return (
    <div className='bg-secondary m-0 p-0'>
        <Header selected={true}/>
        <OrganisationLayout/>
        <Footer />
    </div>
  );
};

export default SelectedOrganisation;
