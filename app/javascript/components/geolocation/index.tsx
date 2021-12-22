import * as React from 'react';
import { throttle } from 'lodash';

import useGeolocation from 'react-hook-geolocation'

const Geolocation = () => {

  const postGeolocation = React.useRef(throttle( (data) => {
    console.log("Data %o", data);
  }, 60000));

  const geolocation = useGeolocation({}, postGeolocation.current);
  return null;
};

export default Geolocation;
