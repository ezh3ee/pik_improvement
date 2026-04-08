import { useComplexStore } from "@/components/map/state/complex-store";
import { SubObjectFull } from "@/components/objects-management/subobjects/action";
import {
  mapSubobjectType,
  SubobjectEnum,
} from "@/components/objects-management/subobjects/subobject-type-map";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

export default function CollapsibleItem({ object }: { object: SubObjectFull }) {
  const setObjectIdToEdit = useComplexStore((state) => state.setObjectIdToEdit);

  return (
    <Collapsible
      className="rounded-md data-[state=open]:bg-muted"
      key={object.id}
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full">
          {object.name}
          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
        <div>{mapSubobjectType(object.type as SubobjectEnum)}</div>
        <Button size="xs">Подробно</Button>
        <Button
          size="xs"
          variant="outline"
          onClick={() => setObjectIdToEdit(object.id)}
        >
          Редактировать
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}
