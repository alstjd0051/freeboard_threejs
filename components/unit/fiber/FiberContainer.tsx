import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "@/components/commons/three/lib/Scene";

type Props = {};

const FiberContainer = (props: Props) => {
  return (
    <Canvas camera={{ position: [14.4666, 2.0365, 5.556165], fov: 40 }}>
      <Scene />
      <OrbitControls minDistance={1} maxDistance={200} />
    </Canvas>
  );
};

export default FiberContainer;
