import Link from 'next/link'
import { BsFacebook, BsYoutube, BsLinkedin } from 'react-icons/bs'
import { CgCopyright } from 'react-icons/cg'

const Footer = () => {
    return (
      <footer className="max-w-7xl mx-auto h-small bg-primary flex flex-row p-4">
          <div className="h-full w-1/3 flex flex-col text-white items-center justify-center gap-1">
            <p className='text-lg'>Socials</p>
            <div className='flex flex-row gap-2'>
              <BsFacebook className='w-6 h-6'/>
              <BsYoutube className='w-6 h-6'/>
              <BsLinkedin className='w-6 h-6'/>
            </div>
          </div>
          <div className="h-full w-1/3 flex flex-col text-white border-r-2 justify-center gap-1">
            <p className='text-lg'>Contact</p>
            <div className='flex flex-col gap-1'>
              <Link href={'/about'} passHref>
                <a>About us page</a>
              </Link>
              <Link href={'/help'} passHref>
                <a>Help us page</a>
              </Link>
            </div>
          </div>
          <div className="h-full w-3/5 flex flex-col text-white items-center justify-center gap-1">
            <div className='flex flex-row items-center gap-1'>
              <CgCopyright className='w-4 h-4'/>
              <p>Dit is een opdracht in samenwerking van Arteveldehogeschool</p>
            </div>
          </div>
      </footer>
    )
  }
  
  export default Footer