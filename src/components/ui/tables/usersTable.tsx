"use server";

import { printUsers } from "@/libs/database/queries/users/displayUsers";
import SelectTypes from "../selectTypes";
import FormPopups from "../popups";
import { Button } from "../buttons";
import updateUsers from "@/libs/database/queries/users/updateUsers";

export default async function UsersTable({
  query,
  currentPage,
  userType,
}: {
  query: string;
  currentPage: number;
  userType: string;
}) {
  const users = await printUsers(query, currentPage, userType);

  return (
    <table className="w-full min-w-[1280px] table-auto text-left text-black">
      <thead className="w-full bg-gray-200">
        <tr className="w-full h-13">
          <th className="pl-4 w-[15%]">
            <SelectTypes
              options={users.userTypes.map((type) => type)}
              message={"User Types"}
              passedParams={"userType"}
            />
          </th>
          <th className="pl-4 w-[25%]">Email</th>
          <th className="pl-4 w-[25%]">Password</th>
          <th className="pl-4 w-[15%]">Contact Number</th>
          <th className="pl-4 w-[10%]">Date</th>
          <th className="pl-4 w-[10%]">Update</th>
        </tr>
      </thead>
      <tbody>
        {users.users.map((user) => (
          <tr
            key={user.user_id}
            className="h-13 w-full border-y border-secondary-dark hover:bg-gray-100"
          >
            <td className="pl-4 w-[15%]">{user.user_type}</td>
            <td className="pl-4 w-[25%]">{user.email}</td>
            <td className="pl-4 w-[25%]">{user.password}</td>
            <td className="pl-4 w-[15%]">{user.contact_number}</td>
            <td className="pl-4 w-[10%]">{user.date ?? "—"}</td>
            <td className="pl-4 w-[10%]">
              <FormPopups
                action={updateUsers}
                message={"Update"}
                variant={"update"}
                size={"small"}
              >
                <input type="hidden" name="userId" value={user.user_id} />
                <div>
                  <h6 className="text-black">Product Types</h6>
                  <select
                    name="userType"
                    defaultValue={user.user_type}
                    className="w-full peer block rounded-md p-2 border-2 border-black text-black"
                  >
                    {["customer", "employee"].map((type) => (
                      <option key={type} value={type} className="text-black">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h6 className="text-black">Email</h6>
                  <input
                    name="email"
                    type="text"
                    placeholder={user.email}
                    defaultValue={user.email}
                    className="h-10 text-black border-black border-2 rounded-md px-4"
                  />
                </div>
                <div>
                  <h6 className="text-black">Contact Number</h6>
                  <input
                    name="contactNumber"
                    type="number"
                    min="1"
                    placeholder={`${user.contact_number}`}
                    defaultValue={user.contact_number}
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
