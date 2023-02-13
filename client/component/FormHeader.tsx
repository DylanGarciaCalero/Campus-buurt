import Link from 'next/link';

interface Page {
  page: string;
}

const FormHeader = (page: Page) => {
  return (
    <header className='flex flex-col justify-between h-medium bg-white'>
      <div className=' flex flex-row h-full items-center ml-6 gap-3'>
        <Link href='/' passHref>
          <figure className='w-28 h-20 bg-primary'></figure>
        </Link>
        <p>Campus in de buurt</p>
      </div>
      <div className='h-16 bg-secondary w-96 relative'>
        <div className='h-full bg-primary w-1/12 absolute right-0'></div>
      </div>
      {page.page === '/login' ? (
        <div className='mt-4 p-8'>
          <h2 className=' text-xl'>Inloggen</h2>
          <div className='flex flex-row gap-3'>
            <h4>Nog geen account?</h4>
            <h4 className=' text-primary'>
              <Link href='/register' passHref>
                Registreer hier
              </Link>
            </h4>
          </div>
        </div>
      ) : (
        <div className='mt-4 p-8'>
          <h2 className=' text-xl'>Registreren</h2>
          <div className='flex flex-row gap-3'>
            <h4>Al een account?</h4>
            <h4 className=' text-primary'>
              <Link href='/login' passHref>
                Log in hier
              </Link>
            </h4>
          </div>
        </div>
      )}
    </header>
  );
};

export default FormHeader;
