"use server";

import { printProducts } from "@/libs/database/queries/products/displayProducts";
import SelectTypes from "../../../../components/ui/selectTypes";

export default async function ProductsTable({
  query,
  currentPage,
  productType,
}: {
  query: string;
  currentPage: number;
  productType: string;
}) {
  const products = await printProducts(query, currentPage, productType);

  return (
    <table className="min-w-full table-auto text-left text-sm text-black">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2">
            <SelectTypes
              label="Product Type"
              options={products.productTypes.map((type) => type)}
            />
          </th>
          <th className="px-4 py-2">Product Name</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {products.products.map((product: any) => (
          <tr key={product.product_id} className="border-t">
            <td className="px-4 py-2">{product.product_type}</td>
            <td className="px-4 py-2">{product.product}</td>
            <td className="px-4 py-2">{product.quantity}</td>
            <td className="px-4 py-2">{product.price}</td>
            <td className="px-4 py-2">{product.date ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
