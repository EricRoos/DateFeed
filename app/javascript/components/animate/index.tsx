import * as React from 'react';

const Animate = (props) => {
  const animated = React.useRef();
  //<Component {...props} className={props.className+" animate__"+animationClass+" animate__animated"} />
  React.useEffect( () => {
    if(animated && animated.current) {
      animated.current.addEventListener('animationend', () => {
        if(props.onAnimationEnd){
          props.onAnimationEnd()
        }
      });
    }
  }, []);
  return (
    <div ref={animated} className={`animate__animated animate__${props.animation} animate__delay-${props.delay} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Animate;
