import { useState } from "react";
import { useSpring, animated, config } from "react-spring";

const AnimatedText = ()=>{
  const [flip, setFlip] = useState(false);
  const props = useSpring({
    to: {opacity: 1},
    from: {opacity: 0},
    reset: true,
    reverse: flip,
    delay: 100,
    config: config.molasses,
    onReset: ()=>setFlip(!flip),
  })
  return <animated.h1 style={props}>Welcome To Egerton Bites</animated.h1>
}

export default AnimatedText;
