"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { userInterface } from "@/interfaces/user.interface";
import { changeUserRol } from "@/actions/users/change-user-rol";

interface Props {
  users: userInterface[];
}
const UsersTable = ({ users }: Props) => {
  return (
    <div>
      <div className="flex items-center p-2">
        <div className="relative  flex w-44 md:w-96">
          <span className="absolute left-1 top-3">
            <MagnifyingGlassIcon className="text-gray-600" />
          </span>
          <input
            placeholder="Search"
            type="text"
            className="w-full text-gray-500 placeholder:text-gray-500  text-sm border  focus:outline-none rounded-2xl py-2.5 pl-8"
          />
        </div>
      </div>

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <select
                  value={user.rol}
                  onChange={(e) => changeUserRol(user.id, e.target.value)}
                  className="block w-full  focus:outline-none rounded-2xl py-2  text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
