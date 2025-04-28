import React from "react";

import Link from "next/link";

const loggedIn = () => {
  <header className="w-full max-w-[1280px] h-12 mx-auto flex justify-between items-center">
    <h1>SPRINKLA</h1>
    <div>
      <Link className="cursor-pointer w-44 h-8 rounded-md bg-quinary" href="/">
        SIGN OUT
      </Link>
    </div>
  </header>;
};

const loggedOut = () => {
  <header className="w-full max-w-[1280px] h-12 mx-auto flex justify-between items-center">
    <h1>SPRINKLA</h1>
    <div>
      <Link
        className="cursor-pointer w-44 h-8 rounded-md bg-quinary"
        href="/login"
      >
        SIGN IN
      </Link>
    </div>
  </header>;
};

const page = () => {
  return (
    <>
      <main></main>
    </>
  );
};

export default page;
