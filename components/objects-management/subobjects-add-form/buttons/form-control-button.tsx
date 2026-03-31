import { Button } from "@/components/ui/button";

export default function MainControlButton({
  text,
  action,
  children,
  //   style,
}: {
  text: string;
  action: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      onClick={action}
      //   style={style ? style : undefined}
    >
      <span className="flex flex-row items-center gap-2">
        {/* <RotateCcw /> */}
        {children}
        <span>{text}</span>
      </span>
    </Button>
  );
}
