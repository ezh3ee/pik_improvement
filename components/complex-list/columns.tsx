"use client";

import { Complex } from "@/components/complex-list/types/complex";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Complex>[] = [
  {
    accessorKey: "name",
    header: "Наименование",
  },
  {
    id: "objectsCount",
    header: "Кол-во объектов",
    cell: ({ row }) => {
      const subObjects = row.original.subObjects;
      const count = subObjects?.length || 0;

      if (count === 0) {
        return <span className="text-gray-400">Нет объектов</span>;
      }

      return <span className="font-semibold text-green-600">{count} шт.</span>;
    },
  },
];
