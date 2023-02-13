import Image from 'next/image';
import profileIcon from '../images/user.png';
import hamburgerIcon from '../images/hamburger.png';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { useAuth } from '../lib/auth';
import {CgProfile, CgMenuRound} from 'react-icons/cg'
import {RiMenu5Line} from 'react-icons/ri'

interface Token {
  email: string;
  exp: number;
  iat: number;
  role: string;
  sub: number;
}

const Nav = () => {
  const [toggleMenu, setMenuOpen] = useState(false);
  const toggleMenuButton = () => {
    toggleMenu === true ? setMenuOpen(false) : setMenuOpen(true);
  };

  const [user, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');

  let jwtToken = Cookies.get('token');
  const { signOut } = useAuth();

  useEffect(() => {
    if (jwtToken) {
      let decoded: Token = jwtDecode(jwtToken);
      setUser(decoded.role);
      setUserEmail(decoded.email);
    } else if (!jwtToken) {
      setUser('');
    }
  }, [jwtToken]);

  return (
    <nav className='relative'>
      <div
        onClick={toggleMenuButton}
        className='grid grid-flow-col items-center gap-2 cursor-pointer bg-white py-1 px-2 rounded-2xl'
      >
        {user ? (
          <div>
            <p>
              Logged in as <span className='text-primary'>{userEmail}</span>
            </p>
          </div>
        ) : (
          <></>
        )}

        <CgProfile className="w-6 h-auto ml-2"/>
        <RiMenu5Line className="w-6 h-auto"/>
      </div>
      <ul
        className={
          toggleMenu
            ? 'absolute right-0 w-52 h-fit p-2 mt-2 flex z-30 text-white flex-col justify-around rounded-2xl bg-primary border-4 border-white'
            : 'hidden'
        }
      >
        {user === '' ? (
          <>
            <li>
              <Link href='/login'>
                <a>Inloggen</a>
              </Link>
            </li>
            <li>
              <Link href='/register'>
                <a>Registreren</a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href='/profile'>
                <a>Mijn profiel</a>
              </Link>
            </li>
            <li>
              <Link href='/organisation/initiatives'>
                <a>Mijn initiatieven</a>
              </Link>
            </li>
            <li>
              <Link href='/organisation/invites'>
                <a>Mijn uitnodigingen</a>
              </Link>
            </li>
          </>
        )}
        <li>
          <Link href='/about'>
            <a>Over ons</a>
          </Link>
        </li>
        <li>
          <Link href='/help'>
            <a>Hulp nodig?</a>
          </Link>
        </li>
        {user === '' ? (
          <></>
        ) : (
          <li className='cursor-pointer' onClick={signOut}>
            <a>Logout</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
