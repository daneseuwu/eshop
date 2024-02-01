import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { currencyFormat } from "@/utils/format";
import Link from "next/link";
import { productPagination } from "@/actions/products/pagination";
import { Button } from "@/components/ui/button";
import { CiShop } from "react-icons/ci";
import ProductImage from "@/components/product/image/productImage";
interface Props {
  searchParams: {
    page?: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await productPagination({
    page,
  });

  return (
    <div className=" bg-white rounded-lg border">
      <div className="flex justify-between items-center p-2">
        <div className="relative  flex w-44 md:w-96">
          <span className="absolute left-1 top-3">
            <MagnifyingGlassIcon className="text-gray-600" />
          </span>
          <input
            placeholder="Search"
            type="text"
            className="w-full text-gray-500 placeholder:text-gray-500  text-sm border  focus:outline-none rounded-lg py-2.5 pl-8"
          />
        </div>
        <Button className="flex gap-2" size="sm">
          <CiShop size={20} />
          <Link href="/admin/product/new">New product</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Zise</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Link href={`/product/${product.slug}`}>
                  <ProductImage
                    src={product.ProductImage[0]?.url}
                    alt={product.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/product/${product.slug}`}
                  className="hover:underline"
                >
                  {product.title}
                </Link>
              </TableCell>

              <TableCell className="font-medium">
                {currencyFormat(product.price)}
              </TableCell>
              <TableCell className="font-medium">{product.inStock}</TableCell>
              <TableCell className="font-medium">
                {product.sizes.join(",")}
              </TableCell>
              <TableCell>
                {product.tags.map(
                  (tag) => tag.charAt(0).toUpperCase() + tag.slice(1)
                )}
              </TableCell>
              <TableCell>
                {product.gender.charAt(0).toUpperCase() +
                  product.gender.slice(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
