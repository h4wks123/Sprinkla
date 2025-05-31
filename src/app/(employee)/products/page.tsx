"use client";

import React, { useEffect } from "react";
import { readProducts } from "@/app/handlers/employee/products/products";

const Products = () => {
  useEffect(() => {
    readProducts();
  }, []);

  return (
    <section className="relative w-[90%] max-w-[1640px] h-[50rem] mx-auto bg-secondary rounded-lg">
      <ul className="bg-red-500 w-full h-[7.5rem] flex justify-between items-center p-10 gap-6 rounded-t-lg">
        <li>Search</li>
        <li>Filter</li>
      </ul>
      <table className="h-[calc(100%-15rem)]"></table>
      <nav className="bg-blue-500 h-[7.5rem] flex justify-center items-center gap-6 rounded-b-lg">
        Test
      </nav>
    </section>
  );
};

export default Products;