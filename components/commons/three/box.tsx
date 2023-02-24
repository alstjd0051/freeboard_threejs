import React, { useRef, useState } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  position: [number, number, number];
};

const Box = (props: Props) => {
  const mesh = useRef<any>();
  const [hoverd, setHoverd] = useState<boolean>(false);
  const [active, setActive] = useState<Boolean>(false);
  useFrame((state, delta) => (mesh.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHoverd(true)}
      onPointerOut={(e) => setHoverd(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
};

export default Box;
