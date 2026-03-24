import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SubObjectBase } from "@/lib/generated/prisma/client";
import { ChevronDownIcon } from "lucide-react";

export default function CollapsibleSubobjectList({
  objects,
}: {
  objects?: SubObjectBase[];
}) {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        {objects?.map((object) => {
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
                <div>{object.type}</div>
                <Button size="sm">Перейти к объекту</Button>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
}
