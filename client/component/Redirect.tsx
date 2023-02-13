import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
    message: string,
    submessage?: string,
    path: string
}

const Redirect = (props: Props) => {
    const router = useRouter()
    const [time, setTime] = useState(2)

    useEffect(() => {
        let interval = setInterval(() => {
            if (time > 0) {
                setTime(time-1)
            } else if (time === 0) {
                clearInterval(interval)
                router.push(props.path);
            }
        }, 1000)
    }, [time])

  return (
      
    <>
        <div className='w-full h-full'>
          <div className='m-auto text-2xl flex flex-col items-center justify-center'>
            <p>
              {props.message}
            </p>
            {
                props.submessage ? props.submessage : ''
            }
            <span className='text-primary'>Redirecting to homepage in {time} seconds</span></div>
        </div>
    </>
  );
};

export default Redirect;
