import PostType from './post';

export default interface ActivityFeedItemType {
  post: PostType;
  likeable: boolean;
}
