import * as React from "react";
import {
  useQuery,
  gql
} from "@apollo/client";

import PostType from '../models/post';


const ACTIVITY_FEED_QUERY = gql`
  query FetchActivityFeed{
    activityFeed{
      id
      content
      profile {
        name
      } 
    }
  }
`

interface ActivityFeedQueryData {
  activityFeed: [PostType]
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
