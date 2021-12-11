import * as React from "react";
import useProfileData from './query';

interface Props {
  profileId: number
}

const Profile = ({
  profileId
} : Props) => {
    
  const {
    loading,
    error,
    data
  } = useProfileData(profileId);

  if(!loading && !error){
    const { profile: {
      name 
    }} = data

    return (
      <div>Profile {name}</div>
    )
  }

  if(loading){
    return (
      <div>Loading</div>
    )
  }
  if(error){
    return (
      <div>Something went wrong</div>
    )
  }
}

export default Profile;
