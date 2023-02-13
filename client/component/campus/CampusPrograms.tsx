import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import * as queries from '../../queries';
import Link from 'next/link';
import { MdOutlineSchool } from 'react-icons/md';

interface EducationalProgram {
  id: number;
  name: string;
  credits: number;
  programType: string;
}

interface Organisation {
  id: number;
  name: string;
  logo: string;
}
interface Initiative {
  id: number;
  name: string;
  description: string;
  organisation: Organisation;
}
interface Campus {
  id: number;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  initiatives: Initiative[];
  educationalPrograms: EducationalProgram[];
}
interface CampusData {
  campus: Campus;
}

interface Initiatives {
  initiatives: Initiative[];
}
interface InitiativesData {
  campus: Initiatives;
}

interface Props {}

const CampusPrograms = (props: Props): any => {
  const router = useRouter();
  const id: number = parseInt(router.query.id as string, 10);

  const campus = useQuery<CampusData>(queries.CAMPUS_DATA, {
    variables: {
      id: id,
    },
  });

  if (campus.loading) return <div>loading campus data</div>;

  return (
    <div className='h-fit w-full pt-4 bg-white my-2'>
      <div className='flex flex-row items-center justify-center mb-4'>
        <h2 className='p-2 mt-2 text-lg'>Opleidingen van deze campus</h2>
        <MdOutlineSchool className='w-16 h-16 text-primary' />
      </div>
      {campus.data && campus.data.campus.educationalPrograms.length === 0 ? (
        <div className='flex items-center justify-center text-primary mb-4'>
          {' '}
          <p>Nog geen opleidingen aanwezig</p>{' '}
        </div>
      ) : (
        ''
      )}

      <ul className='flex flex-row flex-wrap'>
        {!campus.loading &&
          campus.data &&
          campus.data.campus.educationalPrograms.length > 0 &&
          campus.data.campus.educationalPrograms.map((program) => {
            return (
              <>
                <li
                  className='bg-primary w-full m-1 hover:opacity-60'
                  key={program.id}
                >
                  <Link href={'/programs/' + program.id} passHref>
                    <div className='flex flex-col flex-wrap justify-between p-2 cursor-pointer'>
                      <h4 className='text-white'>{program.name}</h4>
                      <div className='flex flex-row justify-between'>
                        <h4>{program.credits} studiepunten</h4>
                        <h4>{program.programType}</h4>
                      </div>
                    </div>
                  </Link>
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default CampusPrograms;
