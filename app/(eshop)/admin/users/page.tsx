import { redirect } from "next/navigation";

import UsersTable from "./table/users";
import { getPaginateUser } from "@/actions/users/get-paginate-users";
const Page = async () => {
  const { ok, users } = await getPaginateUser();

  if (!ok) {
    redirect("/auth/signin");
  }

  return (
    <div className=" bg-white rounded-2xl border">
      <UsersTable users={users} />
    </div>
  );
};

export default Page;
