import * as React from "react";
import useActivityFeedData from './query';
import LikeButton from '../like-button';
const ActivityFeed = () => {
  const {
    loading,
    error,
    data
  } = useActivityFeedData();

  if(!loading && !error){
    const {
      activityFeed
    } = data;
    return (
      <div>
        { activityFeed.map( a => (
          <div key={a.post.id}>
            <div>
              <div>
                <p>
                  { a.post.content }
                </p>
                <small>{a.post.profile.name}</small>
              </div>
              <div>
                { a.likeable && ( <LikeButton liked={a.liked} postId={a.post.id}/> )}
              </div>
            </div>
          </div> 
        )) }
      </div>
    )
  }

  if(loading){
    return (
      <div>Loading</div>
    )
  }
  if(error){
    console.error(error);
    return (
      <div>Something went wrong</div>
    )
  }
}

export default ActivityFeed;
