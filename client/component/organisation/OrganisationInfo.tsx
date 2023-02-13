/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import * as queries from '../../queries';
import Link from 'next/link';
import dynamic from 'next/dynamic';

interface Organisation {
  id: number;
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  logo: string;
}
interface OrganisationData {
  organisationById: Organisation;
}

interface Props {}

const OrganisationInfo = (props: Props): any => {
  const MapWithNoSSR = dynamic(
    () => import('../organisation/OrganisatieMap'), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );

  const router = useRouter();
  const id: number = parseInt(router.query.id as string, 10);

  const organisation = useQuery<OrganisationData>(queries.ORGANISATION, {
    variables: {
      id: id,
    },
  });

  if (organisation.loading) return <div>loading</div>;
  if (id && organisation.data) {
    return (
      <>
        <div className='m-2 p-2 h-full flex flex-col justify-between'>
          <div className='flex flex-row justify-between relative h-full'>
            <div className='w-1/2 h-full'>
              <div className='flex flex-row gap-4 items-center'>
                <div className='w-16 h-16 bg-primary rounded-full border-2 border-primary'>
                  <img
                    className='rounded-full'
                    src={organisation.data.organisationById.logo}
                    alt=''
                  />
                </div>
                <div>
                  <h2 className=' text-primary'>Organisatie</h2>
                  <h3 className=' text-2xl'>
                    {organisation.data.organisationById.name}
                  </h3>
                </div>
              </div>
              <div className='mt-8 border-b-2 pb-2 border-b-white'>
                <h2 className=' text-primary'>Over deze organisatie:</h2>
                <h3>{organisation.data.organisationById.description}</h3>
              </div>
            </div>
            <div className='w-1/2 flex flex-col h-full'>
              <div className='p-2 -m-2 bg-secondary border-white border-8 relative'>
                <p className=' font-semibold mt-2 mb-1'>Contact</p>
                <p>Email: {organisation.data.organisationById.email}</p>
                <p>Adres: {organisation.data.organisationById.address}</p>
                <p>Tel: {organisation.data.organisationById.phone}</p>
                <div className='absolute right-0 bottom-0 flex flex-row'>
                  <p className='bg-primary py-1 px-2 my-1 text-center text-sm'>
                    <Link href={organisation.data.organisationById.website}>
                      Website
                    </Link>
                  </p>
                  <p className='bg-primary py-1 px-2 mx-1 my-1 text-center text-sm'>
                    <Link
                      href={
                        'mailto:' + organisation.data.organisationById.email
                      }
                    >
                      Contacteer via mail
                    </Link>
                  </p>
                </div>
              </div>
              <div className='h-full w-full my-4'>
                <MapWithNoSSR id={id}/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (organisation.error) {
    return <div>Oops! Something went wrong!</div>;
  }
};

export default OrganisationInfo;
