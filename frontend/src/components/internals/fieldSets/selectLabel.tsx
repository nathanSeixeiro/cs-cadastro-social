import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectLabelProps {
  label: string;
  placehoder?: string;
  value?: string;
  name: string;
  required: boolean;
  onChange?: any;
  readonly?: boolean;
  onBlur?: any;
  className?: string;
  childs: { text: string; value: string }[];
}

export function ISelectLabel({
  label,
  name,
  childs,
  placehoder,
  className,
  value,
  onChange,
  required,
  readonly
}: SelectLabelProps) {
  return (
    <fieldset className="grid w-full max-w-sm items-center justify-items-start gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placehoder} />
        </SelectTrigger>
        <SelectContent>
        {childs.map((child) => (
            <SelectItem key={child.value} value={child.value}>
              {child.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </fieldset>
  );
}
