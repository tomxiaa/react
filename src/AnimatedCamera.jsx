import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";

import { AnimationTimeline } from "./AnimationTimeline";

function AnimatedCamera() {
  const cameraRef = useRef();

  useEffect(() => {
    // Here we define the entire sequence of animations for the camera using GSAP
    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      "intro"
    );
      

    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      "middle"
    );

    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      "outro"
    );

    return () => CameraTimeline.kill();
  }, []);
  return (
    <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} />
  );
}

export default AnimatedCamera;
