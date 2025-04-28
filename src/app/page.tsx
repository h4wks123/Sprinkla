import React from "react";

import NavSignInBtn from "@/components/ui/navsigninbtn";
import NavSignOutBtn from "@/components/ui/navsignoutbtn";
import SalesForm from "@/components/ui/salesform";

import { getSession } from "@/libs/auth/session";

const page = async () => {
  const userSession = await getSession();

  console.log(userSession);

  return (
    <>
      <header className="w-full max-w-[1280px] h-12 mx-auto flex justify-between items-center">
        <h1>SPRINKLA</h1>
        <div>{userSession ? <NavSignOutBtn /> : <NavSignInBtn />}</div>
      </header>
      <main>
        <SalesForm />
      </main>
    </>
  );
};

export default page;
