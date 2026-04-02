import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon, LucideIcon } from "lucide-react";

export default function CollapsibleSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}) {
  return (
    <Card className="w-full">
      <CardContent className="text-sm">
        <Collapsible className="rounded-md data-[state=open]:bg-muted">
          <div className="trigger-container flex flex-row items-center gap-2 p-2.5 text-sm">
            <Icon />
            <CollapsibleTrigger asChild>
              {/* <Button variant="ghost" className="group w-full"> */}
              <Button variant="ghost" className="group flex flex-grow">
                {title}
                <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  p-2.5 ">
            {children}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
