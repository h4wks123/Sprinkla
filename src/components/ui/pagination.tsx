"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const visiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages];
    if (currentPage === 2) return [1, 2, 3];

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <Link
        href={createPageURL(Math.max(currentPage - 1, 1))}
        className={clsx(
          "bg-black w-10 h-10 flex justify-between items-center rounded border text-sm",
          currentPage === 1
            ? " bg-gray-300 border-gray-300 cursor-not-allowed"
            : "text-black border-black hover:bg-gray-800"
        )}
        aria-disabled={currentPage === 1}
      >
        <Image
          src="/previous.svg"
          alt="previous"
          width={25}
          height={25}
          className="mx-auto"
        />
      </Link>

      {/* Dynamic Page Numbers */}
      {visiblePages().map((page) => (
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
      ))}

      {/* Next Button */}
      <Link
        href={createPageURL(Math.min(currentPage + 1, totalPages))}
        className={clsx(
          "bg-black w-10 h-10 flex justify-between items-center rounded border text-sm",
          currentPage === totalPages
            ? " bg-gray-300 border-gray-300 cursor-not-allowed"
            : "text-black border-black hover:bg-gray-800"
        )}
        aria-disabled={currentPage === totalPages}
      >
        <Image
          src="/next.svg"
          alt="next"
          width={25}
          height={25}
          className="mx-auto"
        />
      </Link>
    </div>
  );
}
