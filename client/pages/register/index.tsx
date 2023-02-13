import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import RegisterForm from '../../component/auth/RegisterForm';
import LoginLayout from '../../layouts/LoginLayout';

const Register: NextPage = () => {

  const router = useRouter()
  let jwtToken = Cookies.get('token');
  if (jwtToken) {
    router.push('/');
  }

  return (
    <>
      {jwtToken ? 
        <div className='w-full h-full'>
          <div className='m-auto text-2xl'>You are already logged in. <span className='text-primary'>redirecting to homepage</span></div>
        </div>
      :
        <LoginLayout>
          <RegisterForm />
        </LoginLayout>
      }
    </>
  );
};

export default Register;
