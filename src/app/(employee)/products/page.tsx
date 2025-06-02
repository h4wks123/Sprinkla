"use client";

import React, { useEffect, useState } from "react";
import { readProducts } from "@/app/handlers/employee/products/products";
import { Button } from "@/components/ui/buttons";
import { createProductForm } from "@/app/handlers/employee/products/products";
import FormPopups from "@/components/popups/popups";
import Image from "next/image";

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
    <section className="relative bg-white  w-[90%] max-w-[1640px] mx-auto border-2 border-secondary-dark rounded-lg mb-10">
      <nav className="w-full flex flex-col justify-between items-center p-5 gap-6 rounded-t-lg">
        <div className="w-full flex flex-wrap justify-between gap-3">
          <h1 className="text-3xl text-black font-bold">PRODUCTS</h1>
          <li className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
            <Button onClick={() => fetchData(1, searchText)}>Search</Button>
          </li>
        </div>
      </nav>
      <div className="h-[643px] border-secondary-dark border-y overflow-x-auto">
        <table className="w-full min-w-[1280px] table-auto text-left text-black">
          <thead>
            <tr className="h-10 border-secondary-dark border-y">
              <th className="px-4  w-[15%]">
                <select
                  name="productType"
                  id="productType"
                  className="w-[90%] text-black border-2 rounded-md"
                  onChange={() => fetchData(1, searchText)}
                >
                  <option value="">Product Types</option>
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
              </th>
              <th className="px-4 border-secondary-dark border-x w-[30%]">
                Product Name
              </th>
              <th className="px-4 border-secondary-dark border-x w-[7.5%]">
                Quantity
              </th>
              <th className="px-4 border-secondary-dark border-x w-[7.5%]">
                Price
              </th>
              <th className="px-4 border-secondary-dark border-x w-[10%]">
                Date
              </th>
              <th className="px-4 border-secondary-dark border-x w-[10%]">
                Time
              </th>
              <th className="px-4 border-secondary-dark border-x w-[10%]">
                Update
              </th>
              <th className="px-4 border-secondary-dark w-[10%]">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.product_id}
                className="h-15 border-secondary-dark border-y"
              >
                <td className="px-4 border-secondary-dark w-[15%]">
                  {product.product_type}
                </td>
                <td className="px-4 border-secondary-dark border-x w-[30%]">
                  {product.product}
                </td>
                <td className="px-4 border-secondary-dark border-x w-[7.5%]">
                  {product.quantity}
                </td>
                <td className="px-4 border-secondary-dark border-x w-[7.5%]">
                  {product.price}
                </td>
                <td className="px-4 border-secondary-dark border-x w-[10%]">
                  {product.date}
                </td>
                <td className="px-4 border-secondary-dark border-x w-[10%]">
                  {product.time}
                </td>
                <td className="px-4 border-secondary-dark border-x w-[10%] text-white">
                  <Button size="small" variant="update">
                    Update
                  </Button>
                </td>
                <td className="px-4  w-[10%] text-white">
                  <Button size="small" variant="delete">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="flex flex-wrap justify-between items-center gap-6 p-5 rounded-b-lg list-none">
        <FormPopups
          onSubmit={(e) => {
            createProductForm(e);
          }}
          message={"Insert Product"}
        >
          <div>
            <h6 className="text-black">Product Type</h6>
            <input
              name="productType"
              type="text"
              placeholder="Donuts"
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <div>
            <h6 className="text-black">Product Name</h6>
            <input
              name="productName"
              type="text"
              placeholder="Sprinkla Deluxe"
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <div>
            <h6 className="text-black">Quantity</h6>
            <input
              name="quantity"
              type="number"
              min="1"
              placeholder="10"
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <div>
            <h6 className="text-black">Price</h6>
            <input
              name="price"
              type="number"
              min="1"
              placeholder="120"
              className="h-10 text-black border-black border-2 rounded-md px-4"
            />
          </div>
          <Button
            type="submit"
            variant="success"
            interaction="ghost"
            className="mx-auto"
          >
            Insert Product
          </Button>
        </FormPopups>
        <div className="flex justify-center items-center gap-6">
          <Button
            onClick={() => {
              if (currentPage > 1) fetchData(currentPage - 1, searchText);
            }}
            size="icon"
            disabled={currentPage === 1}
          >
            <Image src="/previous.svg" alt="my gif" width={50} height={50} />
          </Button>

          <span className="text-black">{currentPage}</span>

          <Button
            onClick={() => {
              if (currentPage < maxPage) fetchData(currentPage + 1, searchText);
            }}
            size="icon"
            disabled={currentPage === maxPage}
          >
            <Image src="/next.svg" alt="my gif" width={50} height={50} />
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default Products;
