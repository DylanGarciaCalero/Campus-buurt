import React from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import ProfileInfo from '../../component/profile/ProfileInfo';
import ProfileLayout from '../../layouts/ProfileLayout';

interface Props {}

const Profile = (props: Props) => {

  return (
    <div className='bg-secondary m-0 p-0'>
        <Header selected={true}/>
            <ProfileLayout>
                <ProfileInfo/>
            </ProfileLayout>
        <Footer />
    </div>
  );
};

export default Profile;