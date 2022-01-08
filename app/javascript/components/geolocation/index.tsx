import * as React from 'react';
import { throttle } from 'lodash';

import useGeolocation from 'react-hook-geolocation';
import useLogLocation from './mutation';

const Geolocation = () => {
  const [ logLocation ] = useLogLocation();
  const postGeolocation = React.useRef(throttle( (data) => {
    const { latitude, longitude } = data;
    logLocation({ variables: { longitude, latitude, async: true } });
  }, 10000));

  const geolocation = useGeolocation({}, postGeolocation.current);
  if(geolocation.error){
    return (<div className='fixed bottom-2 left-2'>No location data</div>)
  }else{
    return null
  }

};

export default Geolocation;
