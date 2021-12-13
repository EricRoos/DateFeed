import * as React from "react";
import {
  useMutation,
  gql
} from "@apollo/client";

const LIKE_ACTIVITY_FEED_MUTATION = gql`
  mutation($postId: ID!){
    togglePostInteraction(postId: $postId){
      liked
    }
  }
`

interface LikeButtonMutationData {
  liked: Boolean;
}


const useLikeButtonData = (postId : Number) => {
  return useMutation<
      { togglePostInteraction: LikeButtonMutationData },
      { postId: Number}
    >(
      LIKE_ACTIVITY_FEED_MUTATION,
      {
        variables: {
          postId
        }
      }
    );
}

export default useLikeButtonData;
