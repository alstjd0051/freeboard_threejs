import Head from "next/head";
import React from "react";

const Hero = () => {
  return (
    <>
      <Head>
        <title>Tyler Song</title>
      </Head>
      <div className=" flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center tracking-wider">
          <h1 className="pb-4 text-5xl font-bold font-kaushan">
            Hello EveryOne
          </h1>
          <h1 className="pb-4 text-5xl font-bold font-kaushan">
            I'm Tyler Song
          </h1>
          <h3 className="pb-4 text-2xl font-bold font-kaushan">
            Front End Developer
          </h3>
        </div>
        <div className="p-2">
          <button className="p-2 w-[180px] text-xl font-kaushan ">
            Explore More
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
