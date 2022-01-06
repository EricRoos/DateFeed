import ProfileImageType from './profile_image';

export default interface ProfileType {
  id: number;
  name: string;
  age: number;
  lookingFor: string[];
  profileImageUrl?: string;
  photoUrls?: string[];
  profileImages: ProfileImageType[];
}
