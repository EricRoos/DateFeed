import * as React from "react";
import {
  useMutation,
  gql,
  MutationTuple,
} from "@apollo/client";

import ProfileType from '../models/profile';
import ProfileInputType from '../models/profile_input_type';

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfile($profile: ProfileInput!){
    editProfile(profile: $profile){
      profile {
        id
        name
        age
      }
    }
  }

`
interface MutationVariables {
  profile: ProfileInputType;
}

interface MutationResponse {
  profile: ProfileType
}

const useEditProfile = () => {
  return useMutation<MutationResponse, MutationVariables>(EDIT_PROFILE_MUTATION, {
  });
}

export default useEditProfile;
