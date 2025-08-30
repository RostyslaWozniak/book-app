import { Skeleton } from "@/components/shadcn-ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import { cn } from "@/lib/utils/cn";

export function TableSkeleton({
  columnsNumber = 5,
  rowsNumber = 5,
  className,
}: {
  columnsNumber?: number;
  rowsNumber?: number;
  className?: string;
}) {
  const columns = Array.from({ length: columnsNumber });
  const rows = Array.from({ length: rowsNumber });
  return (
    <div className={cn("rounded-lg border", className)}>
      <Table className="">
        <TableHeader>
          <TableRow>
            {columns.map((_, i) => (
              <TableCell key={i}>
                <Skeleton className="h-8" />
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((_, i) => (
            <TableRow key={i}>
              {columns.map((_, i) => (
                <TableCell key={i}>
                  <Skeleton className="h-8" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
