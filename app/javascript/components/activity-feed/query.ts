import * as React from "react";
import {
  useQuery,
  gql
} from "@apollo/client";

import { PageContext } from '../as-page';
import ActivityFeedItemType from '../models/activity_feed_item';


export const ACTIVITY_FEED_QUERY = gql`query FetchActivityFeed{
    activityFeed{
      likeable
      liked
      post {
        id
        createdAt
        content
        profile {
          id
          name
          profileImageUrl
        } 
      }
    }
  }
`

interface ActivityFeedQueryData {
  activityFeed: [ActivityFeedItemType]
}

interface AsyncActivityFeedQueryData {
  jobId: String;
}

interface ActivityFeedQueryVars {
}

const useActivityFeedData = () => {
  const { resolvedQueries } = React.useContext(PageContext);

  const {
    loading,
    error,
    data
  } = useQuery<AsyncActivityFeedQueryData, ActivityFeedQueryVars>(
    ACTIVITY_FEED_QUERY,
    {
      variables: {
        async: true
      }
    }
  );
  let found = {};
  let done = false;
  if(data){
    const { jobId } = data;
    found = resolvedQueries.find( (query) => query['jobId'] === jobId );
    if(found){
      found = found['result']['data'];
      done = true;
    }
  }
  const activityFeed = found ? found['activityFeed'] : [];
  return {
    loading: !done,
    error,
    data: { activityFeed }
  }
}

export default useActivityFeedData;
