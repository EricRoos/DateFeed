import * as React from "react";
import useActivityFeedData from './query';

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
    console.log(activityFeed);
    return (
      <div>
        ActivityFeed
        <section>
          <ul>
            { activityFeed.map( a => <li key={a.id}>{a.content}</li> ) }
          </ul>
        </section>
      </div>
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

export default ActivityFeed;
