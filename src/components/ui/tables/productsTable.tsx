"use server";

import { printProducts } from "@/libs/database/queries/products/displayProducts";
import SelectTypes from "../selectTypes";
import FormPopups from "@/components/ui/popups";
import { Button } from "../buttons";
import updateProducts from "@/libs/database/queries/products/updateProducts";
import deleteProducts from "@/libs/database/queries/products/deleteProducts";

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
    <table className="w-full min-w-[1280px] table-auto text-left text-black">
      <thead className="w-full bg-gray-200">
        <tr className="w-full h-13">
          <th className="pl-4 w-[15%]">
            <SelectTypes
              options={products.productTypes.map((type) => type)}
              message={"Product Types"}
              passedParams={"productType"}
            />
          </th>
          <th className="pl-4 w-[30%]">Product Name</th>
          <th className="pl-4 w-[7.5%]">Quantity</th>
          <th className="pl-4 w-[7.5%]">Price</th>
          <th className="pl-4 w-[10%]">Date</th>
          <th className="pl-4 w-[10%]">Update</th>
          <th className="pl-4 w-[10%]">Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.products.map((product) => (
          <tr
            key={product.product_id}
            className="h-13 w-full border-y border-secondary-dark hover:bg-gray-100"
          >
            <td className="pl-4 w-[15%]">{product.product_type}</td>
            <td className="pl-4 w-[30%]">{product.product}</td>
            <td className="pl-4 w-[7.5%]">{product.quantity}</td>
            <td className="pl-4 w-[7.5%]">{product.price}</td>
            <td className="pl-4 w-[10%]">{product.date ?? "—"}</td>
            <td className="pl-4 w-[10%]">
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
                  Update
                </Button>
              </FormPopups>
            </td>
            <td className="pl-4 w-[10%]">
              <FormPopups
                action={deleteProducts}
                message={"Delete"}
                variant={"delete"}
                size={"small"}
              >
                <input
                  type="hidden"
                  name="productId"
                  value={product.product_id}
                />
                <input
                  type="hidden"
                  name="productName"
                  value={product.product}
                />
                <h4 className="text-black font-semibold">
                  Are you sure you want to delete {product.product}?
                </h4>
                <Button size="small" variant="delete">
                  Delete
                </Button>
              </FormPopups>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
