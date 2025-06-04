"use server";

import { printProducts } from "@/libs/database/queries/products/displayProducts";
import SelectTypes from "../selectTypes";
import FormPopups from "@/components/ui/popups";
import { Button } from "../buttons";
import updateProducts from "@/libs/database/queries/products/updateProducts";

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
            <SelectTypes options={products.productTypes.map((type) => type)} />
          </th>
          <th className="px-4 py-2">Product Name</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Update</th>
          <th className="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.products.map((product) => (
          <tr key={product.product_id} className="border-t">
            <td className="px-4 py-2">{product.product_type}</td>
            <td className="px-4 py-2">{product.product}</td>
            <td className="px-4 py-2">{product.quantity}</td>
            <td className="px-4 py-2">{product.price}</td>
            <td className="px-4 py-2">{product.date ?? "—"}</td>
            <td className="px-4 py-2">
              <FormPopups
                action={updateProducts}
                message={"Update"}
                variant={"update"}
                size={"small"}
              >
                <input
                  type="hidden"
                  name="productId"
                  value={product.product_id}
                />
                <div>
                  <h6 className="text-black">Product Type</h6>
                  <input
                    name="productType"
                    type="text"
                    placeholder={product.product_type}
                    defaultValue={product.product_type}
                    className="h-10 text-black border-black border-2 rounded-md px-4"
                  />
                </div>
                <div>
                  <h6 className="text-black">Product Name</h6>
                  <input
                    name="productName"
                    type="text"
                    placeholder={product.product}
                    defaultValue={product.product}
                    className="h-10 text-black border-black border-2 rounded-md px-4"
                  />
                </div>
                <div>
                  <h6 className="text-black">Quantity</h6>
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    placeholder={`${product.quantity}`}
                    defaultValue={product.quantity}
                    className="h-10 text-black border-black border-2 rounded-md px-4"
                  />
                </div>
                <div>
                  <h6 className="text-black">Price</h6>
                  <input
                    name="price"
                    type="number"
                    min="1"
                    placeholder={`${product.price}`}
                    defaultValue={product.price}
                    className="h-10 text-black border-black border-2 rounded-md px-4"
                  />
                </div>
                <Button
                  type="submit"
                  variant="update"
                  interaction="ghost"
                  className="mx-auto"
                >
                  Update Product
                </Button>
              </FormPopups>
            </td>
            <td className="px-4 py-2"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
