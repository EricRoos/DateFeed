import * as React from "react";
import {
  useMutation,
  gql,
  MutationTuple,
} from "@apollo/client";

const LOG_LOCATION_MUTATION = gql`
  mutation($latitude: Float! $longitude: Float!){
    logLocation(latitude: $latitude, longitude: $longitude){
      logged
    }
  }
`

interface LogLocationMutationData {
  logged: Boolean;
}

const useLogLocationData = () => {
  return useMutation<
      { logLocation: LogLocationMutationData },
      { latitude: Number, longitude: Number, async: Boolean }
    >(
      LOG_LOCATION_MUTATION
    );
}

export default useLogLocationData;
