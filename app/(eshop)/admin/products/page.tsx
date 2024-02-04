import Datatable from '@/components/tables/products/datatable'
import {columns}  from '@/components/tables/products/columns'
import { productPagination } from '@/actions/products/pagination';

interface Props {
  searchParams: {
    page?: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products} = await productPagination({
    page,
  });
  return (
      <Datatable columns={columns} data={products} />
    )
}

export default Page