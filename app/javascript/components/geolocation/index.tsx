import * as React from 'react';
import { throttle } from 'lodash';

import useGeolocation from 'react-hook-geolocation';
import useLogLocation from './mutation';

import Button from '../inputs/button';

const PostGeoLocation = (props) => {
  const {
    longitude,
    latitude
  } = props;
  const [ logLocation ] = useLogLocation();
  React.useEffect( () => {
    if(!longitude || !latitude){
      return;
    }
    logLocation({ variables: { longitude, latitude, async: true } });
  }, [props.latitude, props.longitude])
  return null;
};
const Geolocation = (props) => {
  const [ geolocation, setGeoLocation ] = React.useState({});

  const nextGeolocation = useGeolocation({}, setGeoLocation);

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
  }else if(!geolocation.latitude || !geolocation.longitude){
    return (
      <div>
        Fetching location.
      </div>
    );
  }else{
    return (
      <>
        <PostGeoLocation latitude={geolocation.latitude} longitude={geolocation.longitude} />
        {props.children}
      </>
    )
  }

};

export default Geolocation;
