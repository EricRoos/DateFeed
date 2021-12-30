import ProfileImageType from './profile_image';

export default interface ProfileType {
  id: number;
  name: string;
  age: number;
  profileImageUrl?: string;
  photoUrls?: string[];
  profileImages: ProfileImageType[];
}
