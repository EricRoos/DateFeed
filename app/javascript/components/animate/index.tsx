import * as React from 'react';

const Animate = (props) => {
  const animated = React.useRef();
  //<Component {...props} className={props.className+" animate__"+animationClass+" animate__animated"} />
  React.useEffect( () => {
    if(animated && animated.current) {
      animated.current.addEventListener('animationend', () => {
        console.log('end');
        if(props.onAnimationEnd){
          props.onAnimationEnd()
        }
      });
    }
  }, []);
  return (
    <div ref={animated} className={`animate__animated animate__${props.animation} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Animate;
