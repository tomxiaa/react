import { Canvas, useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import {
  useGLTF,
  Edges,
  MeshPortalMaterial,
  CameraControls,
  Environment,
  PivotControls,
} from "@react-three/drei";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useControls } from "leva";

import AnimatedCamera from "./AnimatedCamera";
import OrangeAnimatedHighlight from "./OrangeAnimatedHighlight";
import BlueAnimatedHighlight from "./BlueAnimatedHighlight";

function Scene({ boxRef }) {
  return (
    <div id="canvas_wrapper">
      <Canvas shadows camera={{ position: [-3, 0, 3] }}>
        {/* <PivotControls anchor={[-1.1, -1.1, -1.1]} scale={0.75} lineWidth={3.5}> */}
        <mesh ref={boxRef} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <Edges />
          <Side rotation={[0, 0, 0]} bg="orange" index={0}>
            <torusGeometry args={[0.65, 0.3, 64]} />
          </Side>
          <Side rotation={[0, Math.PI, 0]} bg="lightblue" index={1}>
            <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
          </Side>
          <Side
            rotation={[0, Math.PI / 2, Math.PI / 2]}
            bg="lightgreen"
            index={2}
          >
            <boxGeometry args={[1.15, 1.15, 1.15]} />
          </Side>
          <Side
            rotation={[0, Math.PI / 2, -Math.PI / 2]}
            bg="aquamarine"
            index={3}
          >
            <octahedronGeometry />
          </Side>
          <Side rotation={[0, -Math.PI / 2, 0]} bg="indianred" index={4}>
            <icosahedronGeometry />
          </Side>
          <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
            <dodecahedronGeometry />
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

  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += delta;
  });

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
