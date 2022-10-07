import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Bird from "../../components/commons/three/Bird";

export default function BirdPage() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 35] }}>
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <OrbitControls />
        <Suspense fallback={null}>
          {new Array(6).fill(3).map((_, i) => {
            const x =
              (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1);
            const y = -10 + Math.random() * 20;
            const z = -5 + Math.random() * 10;
            const bird = ["stork", "parrot", "flamingo"][
              Math.round(Math.random() * 2)
            ];
            let speed = bird === "stork" ? 0.5 : bird === "flamingo" ? 2 : 5;
            let factor =
              bird === "stork"
                ? 0.5 + Math.random()
                : bird === "flamingo"
                ? 0.25 + Math.random()
                : 1 + Math.random() - 0.5;
            return (
              <Bird
                key={i}
                factor={factor}
                speed={speed}
                url={`/glb/${bird}.glb`}
              />
            );
          })}
        </Suspense>
      </Canvas>
    </>
  );
}
