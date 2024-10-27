import { Button } from "@/components/ui/button";
interface CheckboxProps {
  text?: string;
  icon: string;
  onClick?: any;
  className?: string;
}
export function IconButton({ text, icon, className }: CheckboxProps) {
  return text && icon ? (
    <Button className={`justify-between ${className}`} variant="secondary">
      {text}
      <img src={icon} alt="icon" />
    </Button>
  ) : (
    <Button className={className} variant="secondary">
      <img src={icon} alt="icon" />
    </Button>
  );
}