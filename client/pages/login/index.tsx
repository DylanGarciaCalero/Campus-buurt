import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { LoginForm } from '../../component/auth';
import LoginLayout from '../../layouts/LoginLayout';
import { useRouter } from 'next/router';
import Redirect from '../../component/Redirect';

const Login: NextPage = () => {
  const router = useRouter()
  let token = Cookies.get('token');

  return (
    <>
      {token? 
        <Redirect message="You are already logged in" submessage='Please log out before accessing this page' path="/"/>
      :
        <LoginLayout>
          <LoginForm />
        </LoginLayout>
      }
    </>
  );
};

export default Login;
