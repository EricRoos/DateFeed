import * as React from "react";
import {
  useQuery,
  gql
} from "@apollo/client";

import ActivityFeedItemType from '../models/activity_feed_item';


const ACTIVITY_FEED_QUERY = gql`
  query FetchActivityFeed{
    activityFeed{
      likeable
      liked
      post {
        id
        content
        profile {
          name
        } 
      }
    }
  }
`

interface ActivityFeedQueryData {
  activityFeed: [ActivityFeedItemType]
}

interface ActivityFeedQueryVars {
}

const useActivityFeedData = () => {
  const {
    loading,
    error,
    data
  } = useQuery<ActivityFeedQueryData, ActivityFeedQueryVars>(
    ACTIVITY_FEED_QUERY,
    {
      variables: {
      }
    }
  );

  return {
    loading,
    error,
    data,
  }
}

export default useActivityFeedData;
