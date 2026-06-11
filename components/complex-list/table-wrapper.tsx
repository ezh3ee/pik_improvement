import { fetchResidentialComplexesAction } from "@/components/complex-list/actions";
import { columns } from "@/components/complex-list/columns";
import { DataTable } from "@/components/complex-list/data-table";
import { isFetchedError } from "@/lib/type-guard";

export default async function ComplexListWrapper({
  currentPage,
}: {
  currentPage: number;
}) {
  const result = await fetchResidentialComplexesAction({
    page: currentPage,
  });

  // if (result.status === "error") {
  if (isFetchedError(result)) {
    return `Невозможно загрузить список ЖК`;
  }
  return (
    <DataTable
      columns={columns}
      data={result.data}
      currentPage={currentPage}
      totalPages={result.totalPages}
    />
  );
}
