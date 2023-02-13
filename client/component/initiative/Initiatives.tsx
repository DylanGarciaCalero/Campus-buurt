import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import * as queries from '../../queries';
import Link from 'next/link';
import { ListItem } from '../styles/ListItem.style';
import Filter from '../Filter';
import { MdExtension } from 'react-icons/md'

interface Initiative {
  id: number;
  name: string;
  description: string;
}
interface InitiativesData {
  initiativesAccepted: Initiative[];
}

interface Props {}

const InitiativeList = (props: Props): any => {
  const initiatives = useQuery<InitiativesData>(queries.INITIATIVES);
  console.log(initiatives.data);
  if (initiatives.loading) return <div>Loading</div>;
  if (initiatives.data) {
    return (
      <div className='h-full flex flex-row'>
        <div className='flex flex-col w-2/3'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center'>
              <MdExtension className='w-8 h-8 text-primary ml-4'/>
              <div className='p-3 text-lg'>Alle initiatieven</div>
            </div>
            <div className='mr-6'>
              {initiatives.data.initiativesAccepted.length} resultaten
            </div>
          </div>
          <ul className='overflow-y-scroll'>
            {initiatives.data.initiativesAccepted.map((item) => {
              return (
                <Link href={'initiatives/' + item.id} passHref key={item.id}>
                  <ListItem>
                    <MdExtension className='w-5 h-5 ml-4'/>
                    <p>{item.name}</p>
                  </ListItem>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className='w-1/3'>
          <Filter />
        </div>
      </div>
    );
  } else if (initiatives.error) {
    return <div>Oops! Something went wrong! {initiatives.error}</div>;
  }
};

export default InitiativeList;
