import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLUMNS_COUNT = 2;

export default function Loading() {
  return (
    <div className="w-full py-10">
      <div className="overflow-hidden rounded-md border">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              {[...Array(COLUMNS_COUNT)].map((_, index) => {
                return (
                  <TableHead key={`loading-header-${index}`}>
                    <Skeleton className="h-[50%] min-h-[30px] w-full rounded-md" />
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, index) => {
              return (
                <TableRow key={`loading-row-${index}`}>
                  {[...Array(COLUMNS_COUNT)].map((_, index) => {
                    return (
                      <TableCell key={`loading-cell-${index}`}>
                        <Skeleton className="h-[50%] min-h-[20px] w-full rounded-md" />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* loading buttons */}

      <div className="flex items-center justify-start space-x-2 py-4">
        <div>
          <Skeleton className="h-[50%] min-h-[30px] w-[64px] rounded-md" />
        </div>
        <span className="font-semibold flex">
          {[...Array(3)].map((_, index) => {
            return (
              <Skeleton
                className="h-[50%] min-h-[15px] w-[5px] px-2 rounded-md"
                key={`loading-page-${index}`}
              />
            );
          })}
        </span>
        <div>
          <Skeleton className="h-[50%] min-h-[30px] w-[64px] rounded-md" />
        </div>
      </div>
    </div>
  );
}
