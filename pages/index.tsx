import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Home: NextPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center  ">
      <div className="snap-center">
        <h1 className="font-bold md:text-7xl mi:text-3xl ">
          Welcome to tyler board
        </h1>
      </div>
    </div>
  );
};

export default Home;
