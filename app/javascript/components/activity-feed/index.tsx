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
            { activityFeed.map( a => (
              <div key={a.post.id}>
                <div>
                  <div>
                    { a.post.content }
                    <br/>
                    <small>{a.post.profile.name}</small>
                  </div>
                  { a.likeable ? <button>Like</button> : undefined }
                </div>
              </div> 
            )) }
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
    console.error(error);
    return (
      <div>Something went wrong</div>
    )
  }
}

export default ActivityFeed;
