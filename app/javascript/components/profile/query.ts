import * as React from "react";
import {
  useQuery,
  gql
} from "@apollo/client";

import ProfileType from '../models/profile';


const PROFILE_QUERY = gql`
  query FetchProfile($profileId: ID){
    profile(id: $profileId){
      name
      age
    }
  }
`


interface ProfileQueryData {
  profile: ProfileType;
}

interface ProfileQueryVars {
  profileId?: number;
}

const useProfileData = (profileId) => {
  const {
    loading,
    error,
    data
  } = useQuery<ProfileQueryData, ProfileQueryVars>(
    PROFILE_QUERY,
    {
      variables: {
        profileId
      }
    }
  );

  return {
    loading,
    error,
    data,
  }
}

export default useProfileData;
export { PROFILE_QUERY }
