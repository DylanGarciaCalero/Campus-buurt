/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import * as queries from '../../queries';
import Link from 'next/link';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { FaUniversity } from 'react-icons/fa';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

interface EducationalProgram {
  length: number;
  id: number;
  name: string;
  credits: number;
  programType: string;
}
interface Token {
  email: string;
  exp: number;
  iat: number;
  role: string;
  sub: number;
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

const CampusInfo = (props: Props): any => {
  let [loadedInitiatives, setLoadedInitiatives] = useState<number>(3);
  const [user, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');

  let jwtToken = Cookies.get('token');

  useEffect(() => {
    if (jwtToken) {
      let decoded: Token = jwtDecode(jwtToken);
      setUser(decoded.role);
      setUserEmail(decoded.email);
    } else if (!jwtToken) {
      setUser('');
    }
  }, [jwtToken]);

  const router = useRouter();
  const id: number = parseInt(router.query.id as string, 10);
  const removeQuery = () => {
    router.replace('/', undefined, { shallow: true });
  };

  const campus = useQuery<CampusData>(queries.CAMPUS_DATA, {
    variables: {
      id: id,
    },
  });

  const initiatives = useQuery<InitiativesData>(queries.CAMPUS_INITIATIVES, {
    variables: {
      id: id,
    },
  });

  if ((id && campus.loading) || initiatives.loading)
    return <div>Loading campus information</div>;
  if (campus.data && initiatives.data) {
    return (
      <>
        <div className='m-2 p-2 flex justify-between'>
          <div className='flex flex-row gap-4 items-center'>
            <FaUniversity className='w-12 h-12' />
            <div>
              <h2 className=' text-primary'>Campus</h2>
              <h1 className='text-primary font-semibold'>
                {campus.data.campus.name}
              </h1>
            </div>
          </div>
          <h2 onClick={removeQuery} className=' text-primary cursor-pointer'>
            Ga terug naar homepage
          </h2>
        </div>
        <div className='p-2 bg-secondary relative border-white border-8'>
          <div className=' border-b-2 pb-2 border-b-white'>
            <p>Over {campus.data.campus.name}:</p>
            <p>{campus.data.campus.description}</p>
          </div>
          <p className=' font-semibold mt-2 mb-1'>Contact</p>
          <p>Email: {campus.data.campus.email}</p>
          <p>Adres: {campus.data.campus.address}</p>
          <p>Tel: {campus.data.campus.phone}</p>
          <div className='absolute right-0 bottom-0 flex flex-row'>
            <p className='bg-primary py-1 px-2 my-1 text-center text-sm'>
              <Link href={campus.data.campus.website}>Website</Link>
            </p>
            <p className='bg-primary py-1 px-2 mx-1 my-1 text-center text-sm'>
              <Link href={'mailto:' + campus.data.campus.email}>
                Contacteer via mail
              </Link>
            </p>
          </div>
        </div>
        <div>
          <h2 className='p-2 font-semibold'>
            Initiatieven van deze campus:{' '}
            {campus.data.campus.initiatives.length}
          </h2>
          <ul className='p-2 flex gap-1 flex-col'>
            {campus.data.campus.initiatives.map(
              (initiative: Initiative, index: number) => {
                if (index < loadedInitiatives) {
                  return (
                    <li key={initiative.id}>
                      <Link href={'/initiatives/' + initiative.id} passHref>
                        <div className='flex w-full flex-wrap justify-between bg-primary p-2 cursor-pointer'>
                          <h4 className='text-white w-1/4'>
                            {initiative.name}
                          </h4>
                          <div className='flex w-2/3 flew-row justify-between gap-5'>
                            <h5>
                              {initiative.description.substring(0, 50)}...
                            </h5>
                            <span className='text-white'>Lees meer</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                }
              }
            )}
          </ul>
          <div
            onClick={() => setLoadedInitiatives(loadedInitiatives + 3)}
            className={
              loadedInitiatives > campus.data.campus.initiatives.length
                ? 'hidden'
                : 'flex items-center justify-end mr-2'
            }
          >
            <div className='px-3 py-1 text-sm text-white bg-primary rounded-xl flex items-center justify-center gap-2 cursor-pointer'>
              <p>Zie meer</p>
              <BsArrowDownCircleFill className='w-4 h-4' />
            </div>
          </div>
        </div>
        <div>
          <h2 className='p-2 font-semibold'>Deze campus werkt samen met:</h2>
          <ul className='flex flex-row flex-wrap mb-20 p-2 gap-2'>
            {campus.data.campus.initiatives.map((initiative: Initiative) => {
              return (
                <li
                  className='list-none w-24 cursor-pointer'
                  key={initiative.id}
                >
                  <Link
                    href={'/organisation/' + initiative.organisation.id}
                    passHref
                  >
                    <div className='flex flex-col justify-center items-center mb-3'>
                      <img
                        className='w-full rounded-full'
                        src={initiative.organisation.logo}
                        alt={initiative.organisation.name}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {
          user === "Member" ? 
            <div className='flex items-center justify-center absolute bottom-0 right-0'>
              <h1 className='border-t-8 border-t-secondary border-l-8 px-2 border-l-secondary text-primary p-1 hover:bg-primary hover:text-white'>
                <Link href={'/campus/invite/' + campus.data.campus.id}>
                  Ga een samenwerking aan!
                </Link>
              </h1>
            </div>
          :
          ''
        }
        
      </>
    );
  } else if (campus.error) {
    return (
      <>
        <div>Oops! Seems like something went wrong!</div>
      </>
    );
  }
};

export default CampusInfo;
