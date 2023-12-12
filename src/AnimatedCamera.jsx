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
      "intro",
    );

    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: 10,
        z: 0,
      },
      "middle",
    );

    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      "outro",
    );

    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      "outro1",
    );
    AnimationTimeline.to(
      cameraRef.current.position,
      {
        x: 0,
        y: 0,
        z: 0,
      },
      "outro2",
    );
    // AnimationTimeline.to(
    //   cameraRef.current.position,
    //   {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   },
    //   "outro3",
    // );
    // AnimationTimeline.to(
    //   cameraRef.current.position,
    //   {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   },
    //   "outro4",
    // );
    // AnimationTimeline.to(
    //   cameraRef.current.position,
    //   {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   },
    //   "outro5",
    // );
    // AnimationTimeline.to(
    //   cameraRef.current.position,
    //   {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   },
    //   "outro6",
    // );
    // AnimationTimeline.to(
    //   cameraRef.current.position,
    //   {
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //   },
    //   "outro7",
    // );

    return () => CameraTimeline.kill();
  }, []);
  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 3]} />;
}

export default AnimatedCamera;
