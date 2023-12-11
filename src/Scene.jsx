import { Canvas, useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import {
  useGLTF,
  Edges,
  MeshPortalMaterial,
  MeshDistortMaterial,
  CameraControls,
  Environment,
  PivotControls,
} from "@react-three/drei";
import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useControls } from "leva";

import AnimatedCamera from "./AnimatedCamera";
import OrangeAnimatedHighlight from "./OrangeAnimatedHighlight";
import BlueAnimatedHighlight from "./BlueAnimatedHighlight";

function ModelA() {
  const gltf = useGLTF(
    "https://cdn.glitch.global/af9365bb-7251-4a5a-ad93-30532c14e16c/bedroom.glb?v=1702071917890",
  );
  return (
    <primitive
      object={gltf.scene}
      scale={[0.6, 0.6, 0.6]}
      position={[0.1, -0.96, 0]}
      rotation={[0, Math.PI * 1.5, 0]}
    />
  );
}

function ModelB() {
  const gltf = useGLTF(
    "https://cdn.glitch.global/af9365bb-7251-4a5a-ad93-30532c14e16c/living.glb?v=1702259991354",
  );
  return (
    <primitive
      object={gltf.scene}
      scale={[0.6, 0.6, 0.6]}
      position={[0, -1, 0]}
      rotation={[0, -Math.PI * 1.5, 0]}
    />
  );
}

function ModelC() {
  const gltf = useGLTF(
    "https://cdn.glitch.global/af9365bb-7251-4a5a-ad93-30532c14e16c/kitchen.glb?v=1702259987910",
  );
  return (
    <primitive
      object={gltf.scene}
      scale={[0.55, 0.55, 0.55]}
      position={[0, -1, 0]}
      rotation={[0, Math.PI * 2, 0]}
    />
  );
}

function Scene({ boxRef }) {
  return (
    <div id="canvas_wrapper">
      <Canvas shadows camera={{ position: [0, 0, 3] }}>
        {/* <PivotControls anchor={[-1.1, -1.1, -1.1]} scale={0.75} lineWidth={3.5}> */}
        <mesh ref={boxRef} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <Edges />

          <Side rotation={[0, 0, 0]} bg="orange" index={0}>
            <torusGeometry args={[0.65, 0.3, 64]} />
          </Side>

          <Side rotation={[0, Math.PI, 0]} bg="lightblue" index={1}>
            <ModelB />
          </Side>

          <Side
            rotation={[0, Math.PI / 2, Math.PI / 2]}
            bg="lightgreen"
            index={2}
          >
            <torusGeometry args={[0.65, 0.3, 64]} />
          </Side>

          <Side
            rotation={[0, Math.PI / 2, -Math.PI / 2]}
            bg="aquamarine"
            index={3}
          >
            <torusGeometry args={[0.65, 0.3, 64]} />
          </Side>

          <Side rotation={[0, -Math.PI / 2, 0]} bg="indianred" index={4}>
            <ModelA />
          </Side>

          <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
            <ModelC />
          </Side>
        </mesh>
        {/* </PivotControls> */}
        {/* <CameraControls makeDefault /> */}
      </Canvas>
    </div>
  );
}

function Side({ rotation = [0, 0, 0], bg = "#f0f0f0", children, index }) {
  const mesh = useRef();
  const { worldUnits } = useControls({ worldUnits: false });
  const { nodes } = useGLTF(
    "https://cdn.glitch.global/0664c9bb-42d1-4d9a-8003-ece58ab9d670/aobox-transformed.glb?v=1702233614770",
  );

  // useFrame((state, delta) => {
  //   mesh.current.rotation.y = mesh.current.rotation.y += delta;
  // });

  return (
    <MeshPortalMaterial worldUnits={worldUnits} attach={`material-${index}`}>
      {/** Everything in here is inside the portal and isolated from the canvas */}
      <ambientLight intensity={3} />
      <Environment preset="city" />
      {/** A box with baked AO */}
      <mesh
        castShadow
        receiveShadow
        rotation={rotation}
        geometry={nodes.Cube.geometry}
      >
        <meshStandardMaterial
          aoMapIntensity={1}
          aoMap={nodes.Cube.material.aoMap}
          color={bg}
        />
        <spotLight
          castShadow
          color={bg}
          intensity={2}
          position={[5, 5, 5]}
          angle={0.15}
          penumbra={1}
          shadow-normalBias={0.05}
          shadow-bias={0.0001}
        />
      </mesh>
      {/** The shape */}
      <mesh castShadow receiveShadow ref={mesh}>
        {children}
        <meshLambertMaterial color={bg} />
      </mesh>
    </MeshPortalMaterial>
  );
}

export default forwardRef(Scene);
