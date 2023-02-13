import Image from 'next/image';
import React from 'react';
import loginInfo from '../images/loginInfo.png';

interface Props {
  page: any
}

const AboutCampus = (page: Props) => {
  return (
    <div className={(page.page === 'home') ? ' max-w-7xl m-auto bg-white p-6 px-14 pt-14 my-2 flex flex-col' : 'bg-white w-1/2 h-full border-l-8 border-l-secondary px-14 pt-14'}>
      <h1 className='text-primary font-bold text-3xl'>
        Wat is campus in de buurt?
      </h1>
      <div className={(page.page === 'home') ?'h-full flex flex-row' :'h-full flex flex-col'}>
        <div className='text-sm text-gray pt-16 flex flex-col gap-6 mb-12'>
          <p>
            Campus in de buurt is een applicatie waarbij je op interactieve wijze
            samenwerkingen tussen campussen en organisaties kunt bekijken en
            starten.
          </p>
          <p>
            Gebruikers kunnen deze informatie raadplegen door gebruik van een
            interactieve map.
          </p>
          <p>
            Organisaties kunnen verzoeken sturen naar campussen om een nieuwe
            samenwerking aan te gaan.
          </p>
        </div>
        <div>
          <Image src={loginInfo}/>
        </div>
      </div>
    </div>
  );
};
  
export default AboutCampus