import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Box as NativeBox } from "@react-three/drei";

export default function Box(props: any) {
  const mesh = useRef<any>();
  const { viewport } = useThree();

  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(({ mouse }) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    mesh.current.position.set(x, y, 0);
  });
  return (
    <NativeBox
      args={[1, 1, 1]}
      {...props}
      ref={mesh}
      scale={active ? [6, 6, 6] : [5, 5, 5]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        attach="material"
        color={hovered ? "#2b6c76" : "#720b23"}
      />
    </NativeBox>
  );
}
