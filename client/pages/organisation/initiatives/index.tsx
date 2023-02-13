/* eslint-disable react/no-unescaped-entities */
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Footer from '../../../component/Footer';
import Header from '../../../component/Header';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/client';
import * as queries from '../../../queries';
import {HiOutlineInformationCircle} from 'react-icons/hi';
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FiDelete } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'
import EditInitiativeForm from '../../../component/initiative/EditInitiativeForm';

interface Props {}

interface Token {
  role: string;
  email: string;
  sub: string;
}

interface Organisation {
  id: number,
  name: string,
}

interface UserData {
  id: number,
  organisation: Organisation,
}

interface UserInfo {
  userById: UserData
}

interface Initiative {
  id: number,
  name: string,
  accepted: boolean,
  createdAt: string,
  updatedAt: string,
  date: string,
}

interface OrganisationData {
  initiatives: Initiative[];
}

interface OrganisationInfo {
  organisationById: OrganisationData
}

const OrganisationInitiatives = (props: Props) => {
  const [user, setUser] = useState('');
  const [ userId, setUserId ] = useState('');
  const [ editInitiative, setEditInitiative ] = useState(0);
  const [ initiativeName, setInitiativeName ] = useState('');

  let jwtToken = Cookies.get('token');
  useEffect(() => {
    if (jwtToken) {
      let decoded: Token = jwtDecode(jwtToken);
      setUserId(decoded.sub)
      setUser(decoded.role)
    } else if (!jwtToken) {
      setUser('');
    }
  }, [jwtToken]);

  const handleInitiativeEdit = (id:number, name:string) => {
    setInitiativeName(name);
    if (editInitiative === id) {
      setEditInitiative(0)
    } else if (editInitiative === 0 || editInitiative !== id) {
      setEditInitiative(id)
    }
  }
  
  const userInformation = useQuery<UserInfo>(queries.GET_USER, {
    variables: {
        id: userId
    }
  });


  let orgId = userInformation.data?.userById.organisation.id;

  const organisationInitiativeInfo = useQuery<OrganisationInfo>(queries.GET_ORGANISATIONBYID, {
    variables: {
      id: orgId
    }
  })
  

  let acceptedInitiatives:any = [];
  let awaitingInitiatives:any = [];

  if (userInformation.loading || organisationInitiativeInfo.loading) return <div>Loading</div>
  if (userInformation.error || organisationInitiativeInfo.error) return <div>Oops! Something went wrong!</div>
  if (userInformation.data && organisationInitiativeInfo.data) {
    organisationInitiativeInfo.data.organisationById.initiatives.map((initiative) => {
      if (initiative.accepted) {
        acceptedInitiatives.push(initiative)
      } else if (!initiative.accepted) {
        awaitingInitiatives.push(initiative)
      }
    });
    return (
      <div>
        <div className='bg-secondary m-0 p-0'>
        <Header selected={true} />
        
        <div className='max-w-7xl m-auto h-fit bg-white pb-2 mb-2'>
          {
            user === 'Member' ?
            <>
              <div className='m-2 p-2 pt-4'>
                <p className='font-semibold'>De initiatieven van <span className='text-primary'>{userInformation.data.userById.organisation.name}</span></p>
                <div className='flex justify-between p-2 bg-secondary mt-10'>
                  <h3 className='text-blue'>Gevalideerde initiatieven</h3>
                  <p className='text-sm flex items-center gap-1'><HiOutlineInformationCircle className='w-4 h-4'/>Deze initiatieven zijn bekeken en goedgekeurd! Ze zijn momenteel zichtbaar doorheen de website.</p>
                </div>
                 <ul className='flex flex-col p-2'>
                 {
                  (acceptedInitiatives.length > 0) ?
                    acceptedInitiatives.map((initiative: Initiative) => {
                    return (
                    <>
                      <li key={initiative.id} className='mb-2'>
                        <div className='flex flex-row items-center justify-between bg-primary p-2'>
                          <h2 className='w-1/5'>{initiative.name}</h2>
                          <h2 className='w-1/5'>Status: <span className='text-blue'>Geaccepteerd</span></h2>
                          <h2 className='w-1/5'>Aangemaakt op: {initiative.createdAt}</h2>
                          <Link href={"/initiatives/"+initiative.id}>
                            <div className='w-1/5 flex flex-row items-center gap-1 text-white hover:text-secondary cursor-pointer'>
                              <p>Zie initiatiefpagina</p>
                              <BsFillArrowRightCircleFill className='w-5 h-5 mx-2'/>
                            </div>
                          </Link>
                          <div className='w-1/5 text-blue flex flex-row items-center gap-2 hover:text-white cursor-pointer' onClick={() => handleInitiativeEdit(initiative.id, initiative.name)}>
                            <AiFillEdit className='w-5 h-5'/>
                            <h2>Wijzig initiatief</h2>
                          </div>
                        </div>
                      </li>
                      <li className={(initiative.id === editInitiative) ? 'block' : 'hidden'}>
                          <EditInitiativeForm id={editInitiative} name={initiativeName}/>
                      </li>
                    </>
                    )
                  })
                  : (acceptedInitiatives.length === 0) ?
                    <li className='text-sm opacity-30 text-center'>Er zijn geen geaccepteerde initiatieven</li>
                  : ''
                  }
                </ul>
                <div className='flex justify-between p-2 bg-secondary mt-12'>
                  <h3 className='text-blue'>Nog te valideren initiatieven</h3>
                  <p className='text-sm flex items-center gap-1'><HiOutlineInformationCircle className='w-4 h-4'/>Deze initiatieven moeten nog gecontroleerd worden alvorens toegevoegd te worden aan de website.</p>
                </div>
                <ul className='flex flex-col p-2'>
                {
                  (awaitingInitiatives.length > 0) ?
                    awaitingInitiatives.map((initiative: Initiative) => {
                    return (
                    <>
                      <li key={initiative.id} className='mb-2'>
                        <div className='flex flex-row justify-between items-center bg-primary p-2'>
                          <h2 className='w-1/5'>{initiative.name}</h2>
                          <h2 className='w-1/5'>Status: <span className='text-blue'>In aanmaak</span></h2>
                          <h2 className='w-1/5'>Aangemaakt op: {initiative.createdAt}</h2>
                          <div className='w-1/5 flex flex-row items-center gap-1 text-white line-through hover:text-secondary'>
                              <p className=''>Zie initiatiefpagina</p>
                              <BsFillArrowRightCircleFill className='w-5 h-5 mx-2'/>
                          </div>
                          <div className='w-1/5 text-blue flex flex-row items-center gap-2 hover:text-white cursor-pointer' onClick={() => handleInitiativeEdit(initiative.id, initiative.name)}>
                            <AiFillEdit className='w-5 h-5'/>
                            <h2>Wijzig initiatief</h2>
                          </div>
                        </div>
                      </li>
                      <li className={(initiative.id === editInitiative) ? 'block' : 'hidden'}>
                          <EditInitiativeForm id={editInitiative} name={initiativeName}/>
                      </li>
                    </>
                    )
                  })
                  : (awaitingInitiatives.length === 0) ?
                    <li className='text-sm opacity-30 text-center'>Er zijn geen te valideren initiatieven</li>
                  : ''
                }
                </ul>
              </div>
              <Link href='initiatives/create' passHref>
                <div className='bg-blue w-fit text-white hover:bg-secondary m-4'>
                  <h2 className='cursor-pointer p-2'>
                    Creëer een nieuw initiatief
                  </h2>
                </div>
              </Link>
            </> :
            user === 'User' ?
            <div className='flex items-center h-medium justify-center flex-col'>
              <h3>You need to be part of an organisation to view this information.</h3>
              <h3>If you already made a request to join an organisation, you might need to wait until the invitation was accepted.</h3>
            </div> :
            <div className='flex items-center h-medium justify-center'>
              <h3>Please <Link href='/login' passHref><span className='text-primary cursor-pointer'>log in</span></Link> as a member of an organisation to access this page</h3>
            </div>
          }
        </div>
        <Footer />
      </div>
      </div>
    )
  } else if (userInformation.error){
    return (
      <div>
        Oops! Something went wrong.
      </div>
    )
  }
  
};

export default OrganisationInitiatives;
