import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import * as queries from '../queries';

interface Organisation {
  id: number;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  website: string;
}

interface OrganisationData {
  organisations: Organisation[];
}

const OrganisationList = () => {
  const organisations = useQuery<OrganisationData>(queries.ORGANISATIONS);

  if (organisations.loading) return <div>Loading organisations</div>;
  if (organisations.error) return <div>Error found: {organisations.error}</div>;

  return (
    <div className='max-w-7xl mx-auto my-2 p-6 bg-white'>
      <h5>Alle samenwerkende organisaties</h5>
      <ul className='flex flex-row gap-1 mt-5 items-center justify-center flex-wrap h-full'>
        {!organisations.loading &&
          organisations.data &&
          organisations.data.organisations.map((organisation: Organisation) => {
            return (
              <li
                key={organisation.id}
                className=' p-1 w-1/6 bg-primary rounded-xl hover:bg-secondary'
              >
                <Link href={'/organisation/' + organisation.id} passHref>
                  <h6 className='h-20 text-center flex items-center justify-center cursor-pointer'>
                    {organisation.name}
                  </h6>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default OrganisationList;
