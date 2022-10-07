import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Navbar = ({ children }: Props) => {
  return (
    <div className="flex border-8 border-solid border-black ">
      <div className="w-full h-screen">{children}</div>
      <nav className="hidden md:flex  flex-col text-center items-center justify-center md:border-8 w-1/4   border-solid md:border-blue-500 h-screen  ">
        <Link href={"/BoxPage"}>
          <a className="text-lg  font-bold">Move To BoxPage</a>
        </Link>
        <Link href={"/BirdPage"}>
          <a className="text-lg font-bold">Move To BirdPage</a>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
