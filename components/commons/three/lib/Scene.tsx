import React from "react";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import Box from "../box";

type Props = {};

const Scene = (props: Props) => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </>
  );
};

export default Scene;
