import type { NextPage } from 'next';
import Header from '../../component/Header';

const About: NextPage = () => {
  return (
    <div className='bg-secondary w-screen h-screen'>
      <Header />
      <h2>About page</h2>
    </div>
  );
};

export default About;
