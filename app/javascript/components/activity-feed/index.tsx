import * as React from "react";
import useActivityFeedData from './query';
import LikeButton from '../like-button';
import TimeLine from '../time-line';
import Panel from '../panel';

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
        <div className='pb-4'>
          <Panel>
            <div className='py-3'>
              <h1 className='text-2xl flex items-center'>
                <div className='tracking-wider'>
                  Activity Feed
                </div>
              </h1>
            </div>
          </Panel>
        </div>
        <TimeLine>
          { activityFeed.map( a => (
            <TimeLine.Item key={a.post.id}>
              <h3 className="mb-3 font-bold text-white text-2xl">{a.post.profile.name}</h3>
              <p className="pb-4 text-sm text-gray-100">{a.post.createdAt}</p>
              <hr />
              <p className="text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
                {a.post.content}
              </p>
              <hr />
              <div className='text-white'>
                { a.likeable && ( <LikeButton liked={a.liked} postId={a.post.id}/> )}
              </div>
            </TimeLine.Item> 
          )) }
        </TimeLine>
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
