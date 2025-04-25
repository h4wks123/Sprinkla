import React from "react";

import Link from "next/link";

const page = () => {
  return (
    <>
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
      </header>
      <main></main>
    </>
  );
};

export default page;
