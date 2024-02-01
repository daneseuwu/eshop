"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePaginationNumbers } from "@/utils/paginationNumber";
import { redirect, usePathname, useSearchParams } from "next/navigation";

interface Props {
  totalPages: number;
}

export const Paginationn = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`; //   href="/kid";
    }

    if (+pageNumber > totalPages) {
      // Next >
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className="py-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageUrl(currentPage - 1)} />
        </PaginationItem>

        {allPages.map((page, i) => (
          <PaginationItem key={page}>
            <PaginationLink href={createPageUrl(page)}>{page}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={createPageUrl(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default Paginationn;
