import { Checkbox } from "@/components/ui/checkbox"
interface CheckboxProps{
    name: string;
    text: string;
    boldText?: string;
    required: boolean;
    
}
export function CheckboxLabel({name, text, boldText, required}: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox required={required} id={name} name={name} />
      <label
        htmlFor={name}
        className="text-sm text-[#344054] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
        { boldText ? <b className="font-bold ml-1 text-[#0A1576]">{boldText}</b> : ""}
   
      </label>
    </div>
  )
}
