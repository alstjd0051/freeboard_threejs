import React from "react";
import dynamic from "next/dynamic";
import ScrollPage from "../../unit/ScrollPage";

const ScrollPageLoader = dynamic(
  () => import("../three/model/ScrollModelAnimation"),
  { ssr: false, loading: () => <ScrollPage /> }
);

const Scroll = () => {
  return (
    <div className="w-full">
      <div>
        <ScrollPageLoader />
      </div>
    </div>
  );
};

export default Scroll;
