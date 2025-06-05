"use server";

import Search from "@/components/ui/search";
import { fetchUserPages } from "@/libs/database/queries/users/displayUsers";
import { Suspense } from "react";
import Image from "next/image";
import UsersTable from "@/components/ui/tables/usersTable";
import Pagination from "@/components/ui/pagination";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    userType?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const userType = searchParams?.userType || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { totalPages } = await fetchUserPages(query, userType);

  return (
    <section className="w-full">
      <div className="w-full bg-secondary flex flex-wrap items-center justify-between rounded-t-lg p-6 gap-6">
        <h1 className="text-3xl text-black font-bold">USERS</h1>
        <Search placeholder="Search user name..." />
      </div>
      <div className="h-[620px] border-secondary-dark border-t overflow-x-auto">
        <Suspense
          key={query + currentPage + userType}
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              <Image
                src="/loader.gif"
                alt="loader"
                width={75}
                height={75}
                className="mx-auto"
              />
            </div>
          }
        >
          <UsersTable
            query={query}
            currentPage={currentPage}
            userType={userType}
          />
        </Suspense>
      </div>
      <div className="w-full flex flex-wrap justify-end items-center p-6 gap-6">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
