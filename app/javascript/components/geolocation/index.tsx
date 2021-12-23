import * as React from 'react';
import { throttle } from 'lodash';

import useGeolocation from 'react-hook-geolocation';
import useLogLocation from './mutation';

const Geolocation = () => {
  const [ logLocation ] = useLogLocation();
  const postGeolocation = React.useRef(throttle( (data) => {
    const { latitude, longitude } = data;
    logLocation({ variables: { longitude, latitude} });
  }, 10000));

  const geolocation = useGeolocation({}, postGeolocation.current);
  return null;
};

export default Geolocation;
