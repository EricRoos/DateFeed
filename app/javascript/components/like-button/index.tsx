import * as React from "react";
import useLikeButton from './mutation';
import Icon from 'supercons';
import { throttle } from 'lodash'

interface Props {
  postId: Number;
  liked: Boolean;
}

const toggleLikeButton = throttle((togglePostInteraction, postId, currentlyLiked, setCurrentlyLiked) => {
  togglePostInteraction({variables: { liked: !currentlyLiked, postId: postId}}).then((resp) => {
    setCurrentlyLiked(resp.data.togglePostInteraction.liked);
  })
}, 1500);

const LikeButton = ({postId, liked}: Props) => {
  const [ currentlyLiked, setCurrentlyLiked ] = React.useState(liked);

  const [ togglePostInteraction, {
    error,
    data,
    loading,
    called
  }] = useLikeButton(postId);


  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCurrentlyLiked(!currentlyLiked);
    toggleLikeButton( togglePostInteraction, postId, currentlyLiked, setCurrentlyLiked);
  };

  if(!loading && !error){
    return (
      <button onClick={buttonHandler}>
        <Icon glyph={ currentlyLiked ? 'thumbsup-fill' : 'thumbsup' } />
      </button>
    );
  }

  if(loading){
    return (
      <div>Saving...</div>
    )
  }
  if(error){
    console.error(error);
    return (
      <div>Something went wrong</div>
    )
  }
}

export default LikeButton;
