import { Button } from "@/components/ui/button";

export default function MainControlButton({
  text,
  action,
  children,
  reversed,
  //   style,
}: {
  text: string;
  action: () => void;
  children?: React.ReactNode;
  reversed?: boolean;
}) {
  return (
    <Button
      variant="outline"
      onClick={action}
      //   style={style ? style : undefined}
    >
      <span
        className={
          "flex items-center gap-2" +
          (reversed ? " flex-row-reverse" : " flex-row")
        }
      >
        {/* <RotateCcw /> */}
        {children}
        <span>{text}</span>
      </span>
    </Button>
  );
}
