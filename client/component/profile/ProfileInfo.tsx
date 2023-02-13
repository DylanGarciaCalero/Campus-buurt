import { useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import {CgProfile} from 'react-icons/cg'
import * as queries from '../../queries';
import {HiOutlineInformationCircle} from 'react-icons/hi'
import {FiEdit} from 'react-icons/fi'

interface Props {
}

interface Token {
    email: string,
    role: string,
    sub: number
}

interface Organisation {
    name: string,
    logo: string
}

interface UserData {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    organisation: Organisation,
    role: string;
}

interface UserInfo {
    userById: UserData
}

const ProfileInfo = (props: Props) => {

    const [userRole, setUserRole] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const userInformation = useQuery<UserInfo>(queries.GET_USER, {
        variables: {
            id: userId
        }
    });

    console.log(userInformation.data, "hahahah")
    let jwtToken = Cookies.get('token')
    useEffect(() => {
        if (jwtToken) {
          let decoded: Token = jwtDecode(jwtToken);
          console.log(decoded)
          setUserId(decoded.sub);
          setUserRole(decoded.role);
        }
      }, [jwtToken]);
    
  return (
    <>
    <div className='flex flex-row gap-2 items-center ml-4 mt-4 text-xl text-primary'>
        <CgProfile className='w-10 h-10'/>
        <h2>Jouw profiel</h2>
    </div>
    <div className='flex flex-row'>
    
    <div className='m-4 flex flex-col gap-2 w-1/2'>
        {userInformation.data ?
        <>
        <div className='w-full bg-secondary p-2 relative'>
            <div className='text-lg mt-4'>
                <p>Jouw voornaam en familienaam:</p>
            </div>
            <div className='flex flex-row items-center gap-1 text-primary'>
                <p>{userInformation.data?.userById.firstName}</p>
                <p>{userInformation.data?.userById.lastName}</p>
            </div>
            <div className='text-lg mt-4'>
                <p>Jouw E-mailadres:</p>
            </div>
            <div className='flex flex-row items-center gap-1 text-primary'>
                <p>{userInformation.data?.userById.email}</p>
            </div>
            <div className='absolute right-0 bottom-0 p-2 text-sm flex flex-row items-center gap-1 text-blue cursor-pointer hover:text-primary'>
                <FiEdit className='w-4 h-4'/>
                <p>wijzig profiel</p>
            </div>
        </div>
        <div className='w-full p-2 pb-4 border-4 border-secondary flex'>
            {
                userInformation.data.userById.organisation === null ?
                <div>Je bent momenteel geen lid van een organisatie</div>
                :
                <div className='flex flex-col gap-4 items-center'>
                <div className='w-1/2 items-center flex justify-center mt-2'>
                    <img className='rounded-full w-1/3' src={userInformation.data.userById.organisation.logo} alt={userInformation.data.userById.organisation.name} />
                </div>
                <div className='flex flex-col w-1/2'>
                    <div className='flex flex-col justify-center gap-1 mt-2 text-primary'>
                        <div className='text-lg'>
                            <p>Je bent lid van volgende organisatie:</p>
                        </div>
                        <p className='text-blue text-sm'>{userInformation.data?.userById.organisation.name}</p>
                        <p className='text-blue text-sm'>Rol: {userInformation.data?.userById.role}</p>
                    </div>
                    <div className='w-full p-1 bg-secondary mt-3 flex flex-row gap-4 items-center relative text-sm'>
                        <HiOutlineInformationCircle className='w-6 h-6 absolute -top-3 -right-3'/>
                        {
                            userRole === 'Member' ?
                            <p>Als <span className='text-blue'>{userRole}</span> van een organisatie heb je toegang tot het creëren en bekijken van initiatieven van jouw organisatie.</p>
                            : ''
                        }
                    </div>
                </div>
            </div>
            }
        </div>
            
        </>
        :
        userInformation.loading ?
        <div>Loading</div>
        : userInformation.error ?
        <div>Oops! Something went wrong! {userInformation.error}</div>
        : ''
    }
    </div>
    </div>
    </>
  );
};

export default ProfileInfo;