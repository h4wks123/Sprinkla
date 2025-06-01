"use client";

import React, { useEffect, useState } from "react";
import { readProducts } from "@/app/handlers/employee/products/products";
import { Button } from "@/components/ui/buttons";
import { createProductForm } from "@/app/handlers/employee/products/products";

type Product = {
  product_id: number;
  product_type: string;
  product: string;
  quantity: number;
  price: number;
  date: string;
  time: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [productTypes, setProductTypes] = useState<{ product_type: string }[]>(
    []
  );
  const itemsPerPage = 10;
  const maxPage = Math.ceil(totalCount / itemsPerPage);

  async function fetchData(page: number, search: string) {
    const start = (page - 1) * itemsPerPage + 1;
    const end = start + itemsPerPage - 1;

    const selectedType =
      (document.getElementById("productType") as HTMLSelectElement)?.value ||
      "";

    const data = await readProducts(start, end, search, selectedType);
    if (!data) return;

    const [results, count, productTypes] = data;
    setProducts(results);
    setTotalCount(count);
    setCurrentPage(page);
    setProductTypes(productTypes);
  }

  useEffect(() => {
    fetchData(1, searchText);
  }, []);

  return (
    <section className="relative w-[90%] max-w-[1640px] h-[50rem] mx-auto bg-secondary rounded-lg">
      <ul className="bg-red-500 w-full h-[15rem] flex flex-col justify-between items-center p-10 gap-6 rounded-t-lg">
        <div className="w-full flex justify-between">
          <li className="flex">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="rounded px-4 py-2 text-black"
            />
            <Button onClick={() => fetchData(1, searchText)}>Search</Button>
          </li>
          <select
            name="productType"
            id="productType"
            className="p-2 rounded text-black"
            onChange={() => fetchData(1, searchText)}
          >
            <option value="">All Product Types</option>
            {productTypes.map((productType) => (
              <option
                key={productType.product_type}
                value={productType.product_type}
                className="text-black"
              >
                {productType.product_type}
              </option>
            ))}
          </select>
        </div>
        <form
          onSubmit={(e) => {
            createProductForm(e);
          }}
          className="w-full flex justify-between items-center gap-2"
        >
          <input
            name="productType"
            type="text"
            placeholder="Product Type"
            className="rounded px-4 py-2 text-black"
          />
          <input
            name="productName"
            type="text"
            placeholder="Product Name"
            className="rounded px-4 py-2 text-black"
          />
          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            className="rounded px-4 py-2 text-black"
          />
          <input
            name="price"
            type="number"
            min="1"
            placeholder="Price"
            className="rounded px-4 py-2 text-black"
          />
          <Button type="submit">Search</Button>
        </form>
      </ul>
      <div className="overflow-x-auto h-[calc(100%-21.5rem)]">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Type</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id} className="border-t">
                <td className="px-4 py-2">{product.product_type}</td>
                <td className="px-4 py-2">{product.product}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.date}</td>
                <td className="px-4 py-2">{product.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="bg-blue-500 h-[7.5rem] flex justify-center items-center gap-6 rounded-b-lg list-none">
        <div className="flex justify-center items-center gap-6">
          <Button
            onClick={() => {
              if (currentPage > 1) fetchData(currentPage - 1, searchText);
            }}
            size="icon"
            disabled={currentPage === 1}
          >
            Prev
          </Button>

          <span className="text-white">{currentPage}</span>

          <Button
            onClick={() => {
              if (currentPage < maxPage) fetchData(currentPage + 1, searchText);
            }}
            size="icon"
            disabled={currentPage === maxPage}
          >
            Next
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default Products;
