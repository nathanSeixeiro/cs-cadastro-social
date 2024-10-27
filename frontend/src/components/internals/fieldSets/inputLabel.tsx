import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputLabelProps{
  label: string,
  placehoder?: string
  value?: string
  name: string
  type: string
  required: boolean
  onChange?: any
  readonly?: boolean
  onBlur?: any
  className?: string
}

export function InputLabel({label, placehoder, className, name, value, type, onChange, onBlur, required, readonly} : InputLabelProps) {
  return (
    <fieldset className="grid w-full max-w-sm items-center justify-items-start gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input required={required} name={name} className={className} onBlur={onBlur} value={value} type={type} readOnly={readonly} onChange={onChange} id="email" placeholder={placehoder} />
    </fieldset>
  )
}
