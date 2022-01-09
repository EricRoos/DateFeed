import * as React from 'react';
import { throttle } from 'lodash';

import useGeolocation from 'react-hook-geolocation';
import useLogLocation from './mutation';

import Button from '../inputs/button';

const Geolocation = (props) => {
  const [ logLocation ] = useLogLocation();

  const postGeolocation = React.useRef(throttle( (data) => {
    const { latitude, longitude } = data;
    logLocation({ variables: { longitude, latitude, async: true } });
  }, 10000));


  const geolocation = useGeolocation({}, postGeolocation.current);
  if(geolocation.error){
    return (
      <div className='flex flex-col p-4 divide-y divide-gray-500 gap-4'>
        <div className='text-2xl pb-2'>
          Uh-oh! :(
        </div>
        <div className='text-gray-500 pt-2'>
          <p className='text-xl'>
            It seems you have location sharing turned off.
          </p>
          <div className='mt-4'>
            <Button onClick={() => {}}>Enable Now</Button>
          </div>
        </div>
        <div className='pt-2'>
          <p className='text-sm text-gray-300'>
            { geolocation.error && geolocation.error.message }
          </p>
        </div>
      </div>
    )
  }else{
    return props.children;
  }

};

export default Geolocation;
