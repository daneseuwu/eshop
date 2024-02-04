import { getPaginateUser } from '@/actions/users/get-paginate-users';
import { columns } from '@/components/tables/users/columns'
import DataTable from '@/components/tables/users/datatable'
import { redirect } from 'next/navigation';

const Page = async () => {
    const { ok, users } = await getPaginateUser();

  if (!ok) {
    redirect("/auth/signin");
  }
  return (
    <DataTable columns={columns} data={users} />
  )
}

export default Page

