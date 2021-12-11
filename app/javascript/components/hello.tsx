import * as React from "react";
import ProfileType from './profile';

interface Props {
  profile: ProfileType
}

const Hello = ({
  profile
} : Props) => {
  return (
    <div>Hello from {profile.id} now live ya. Reload!</div>
  )
}

export default Hello;
