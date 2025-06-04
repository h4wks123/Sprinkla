"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <Link
        href={createPageURL(Math.max(currentPage - 1, 1))}
        className={clsx(
          "px-3 py-1 rounded border text-sm",
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-black border-black hover:bg-gray-100"
        )}
        aria-disabled={currentPage === 1}
      >
        Previous
      </Link>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={createPageURL(page)}
            className={clsx(
              "px-3 py-1 rounded text-sm border",
              page === currentPage
                ? "bg-black text-white border-black"
                : "text-black border-gray-300 hover:bg-gray-100"
            )}
          >
            {page}
          </Link>
        );
      })}

      {/* Next Button */}
      <Link
        href={createPageURL(Math.min(currentPage + 1, totalPages))}
        className={clsx(
          "px-3 py-1 rounded border text-sm",
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-black border-black hover:bg-gray-100"
        )}
        aria-disabled={currentPage === totalPages}
      >
        Next
      </Link>
    </div>
  );
}