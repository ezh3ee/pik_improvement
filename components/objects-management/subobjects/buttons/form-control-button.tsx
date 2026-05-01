import { Button } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

export default function MainControlButton({
  text,
  action,
  children,
  variant = "outline",
  reversed,
  //   style,
}: {
  text: string;
  action: () => void;
  children?: React.ReactNode;
  variant?: VariantProps<typeof Button>["variant"];
  reversed?: boolean;
}) {
  return (
    <Button
      variant={variant}
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
