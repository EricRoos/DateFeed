import * as React from "react";
import useLikeButton from './mutation';

interface Props {
  postId: Number;
  liked: Boolean;
}

const LikeButton = (props : Props) => {
  const [ togglePostInteraction, {
    error,
    data,
    loading,
    called
  }] = useLikeButton(props.postId);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    togglePostInteraction();
  };
  if(!loading && !error){
    const liked = called ? data.togglePostInteraction.liked : props.liked;
    return (
      <button onClick={buttonHandler}>
        { liked ? '🔥' : 'Like' }
      </button>
    );
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

export default LikeButton;
