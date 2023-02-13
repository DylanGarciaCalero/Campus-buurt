import type { NextPage } from 'next';
import { LoginInfo } from '../component/auth';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';
import logo from '../images/logo.png';
import Image from 'next/image';
import FormHeader from '../component/FormHeader';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

const LoginLayout: NextPage = (props) => {
  const router = useRouter();
  const selectedPage = router.pathname;

  return (
    <>
      <div className='bg-secondary py-0 screen h-screen flex'>
        <main className=' max-w-7xl h-5/6 bg-white m-auto flex'>
          <div className=' bg-white h-full w-4/5 flex flex-row'>
            <div className={selectedPage == '/register' ? 'w-4/5' : 'w-1/2'}>
              <FormHeader page={selectedPage} />
              {props.children}
            </div>
            {selectedPage == '/login' ? <LoginInfo page='login' /> : ''}
          </div>

          <div className='h-full flex flex-col justify-between w-1/5 bg-white border-l-[1rem]  border-secondary'>
            <div className='w-full h-32 bg-primary border-b-[1rem] border-secondary flex'>
              <div className='w-2/3 flex justify-between m-auto items-center'>
                <a href='https://www.facebook.com/arteveldehogeschool'>
                  <FaFacebookF color='white' size={30} />
                </a>
                <a href='https://www.linkedin.com/arteveldehogeschool'>
                  <FaLinkedinIn color='white' size={32} />
                </a>
                <a href='https://www.youtube.com/channel/arteveldehogeschool'>
                  <AiFillYoutube color='white' size={35} />
                </a>
              </div>
            </div>
            <div className='bg-primary w-full m-auto my-0 h-24 flex border-b-[1rem] border-b-secondary'>
              <h2 className='text-white font-bold text-2xl w-full text-center m-auto '>
                Spotlightproject
              </h2>
            </div>
            <div className='border-b-[1rem] border-b-secondary h-1/2'></div>
            <div className='border-b-[1rem] border-b-secondary h-26 flex items-center justify-center'>
              <Image src={logo} alt='logo' />
            </div>
            <div className='h-16 flex justify-center items-center cursor-pointer text-xl text-primary'>
              <Link href='/help' passHref>
                <h3>Hulp nodig?</h3>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginLayout;
