import { Button, type ButtonProps } from "@/components/shadcn-ui/button";
import { ArrowLeft } from "lucide-react";

type FormBackButtonProps = {
  label?: string;
  icon?: React.ElementType;
  goBack: () => void;
} & ButtonProps;

export function FormBackButton({
  label = "Cofnij",
  icon: Icon = ArrowLeft,
  goBack,
  ...props
}: FormBackButtonProps) {
  return (
    <Button variant="link" onClick={goBack} {...props}>
      <Icon />
      {label}
    </Button>
  );
}
