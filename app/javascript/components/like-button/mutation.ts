import * as React from "react";
import {
  useMutation,
  gql,
  MutationTuple,
} from "@apollo/client";

const LIKE_ACTIVITY_FEED_MUTATION = gql`
  mutation($postId: ID!, $liked: Boolean!){
    togglePostInteraction(postId: $postId, liked: $liked){
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
      { postId: Number, liked: Boolean}
    >(
      LIKE_ACTIVITY_FEED_MUTATION,
    );
}

export default useLikeButtonData;
