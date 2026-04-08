"use client";

import { useComplexStore } from "@/components/map/state/complex-store";
import { fetchSubobject } from "@/components/objects-management/subobjects/action";
import SubobjectsForm from "@/components/objects-management/subobjects/form";
import { useQuery } from "@tanstack/react-query";

export default function SubobjectsFormContainer() {
  const objectIdToEdit = useComplexStore((state) => state.objectIdToEdit);

  const {
    data: object,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["objects", objectIdToEdit],
    queryFn: () => {
      if (!objectIdToEdit) return;
      return fetchSubobject(objectIdToEdit);
    },
    enabled: !!objectIdToEdit,
    staleTime: 1000 * 60 * 5,
  });

  const statusStyle = "text-xl text-muted-foreground mt-2 mb-2";

  if (isLoading)
    return <span className={statusStyle}>Загрузка объекта...</span>;

  if (isError)
    return <span className={statusStyle}>Ошибка загрузки объекта</span>;

  return <SubobjectsForm object={object} />;
}
