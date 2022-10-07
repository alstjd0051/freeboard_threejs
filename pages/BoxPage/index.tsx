import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "../../components/commons/three/box";

const BoxPage = () => {
  return (
    <Canvas camera={{ position: [0, 0, 35] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Box position={[10, 0, 0]} />
      <Box position={[-10, 0, 0]} />
      <Box position={[0, 10, 0]} />
      <Box position={[0, -10, 0]} />
    </Canvas>
  );
};

export default BoxPage;
