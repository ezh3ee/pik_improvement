import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TransitionStartFunction } from "react";

export default function PaginationButtons<TData>({
  table,
  startTransition,
}: {
  table: Table<TData>;
  startTransition: TransitionStartFunction;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (pageIndex: string) => {
    const params = new URLSearchParams(searchParams);
    if (pageIndex) {
      params.set("page", pageIndex);
    } else {
      params.delete("page");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const paginationState = table.getState().pagination;

  return (
    <div className="flex items-center justify-start space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          // handlePageChange(String(table.getState().pagination.pageIndex - 1))
          handlePageChange(String(paginationState.pageIndex))
        }
        disabled={!table.getCanPreviousPage()}
      >
        Назад
      </Button>
      <span className="font-semibold">
        {paginationState.pageIndex + 1} из {table.getPageCount()}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(String(paginationState.pageIndex + 2))}
        disabled={!table.getCanNextPage()}
      >
        Вперёд
      </Button>
    </div>
  );
}
