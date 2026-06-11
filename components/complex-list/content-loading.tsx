import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function ContentLoading({
  lastRows = 10,
  columns = 2,
}: {
  lastRows: number;
  columns?: number;
}) {
  return (
    <TableBody>
      {[...Array(lastRows)].map((_, index) => {
        return (
          <TableRow key={`loading-row-${index}`}>
            {[...Array(columns)].map((_, index) => {
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
  );
}
