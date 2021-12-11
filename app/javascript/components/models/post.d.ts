import ProfileType from './profile';

export default interface PostType {
  id: number;
  content: string;
  profile: ProfileType
}
