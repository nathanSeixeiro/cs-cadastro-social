import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
interface InputLabelProps {
  label: string;
  placehoder?: string;
  name: string;
}

export function InputLabelPassword({label,placehoder,name,}: InputLabelProps) {
  const [showed, setShowed] = useState(false);

  const toggleShow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowed((prev) => !prev);
  };

  return (
    <fieldset className="flex w-full h-full max-w-sm items-center">
      <div className="grid justify-items-start w-full  gap-1.5">
        <Label htmlFor={name}>{label}</Label>
        <div className="flex items-center w-full">
          <Input
            className="border-r-0 rounded-r-none"
            name={name}
            type={showed ? "text" : "password"}
            id="email"
            placeholder={placehoder}
            required
          />
          <button
            className="h-9 w-fit rounded-md rounded-l-none border-l-0 border border-input bg-transparent px-3 py-1 text-sm transition-colors"
            onClick={toggleShow}
          >
            {showed ? (
              <EyeOff color="#667085" size={20} />
            ) : (
              <Eye color="#667085" size={20} />
            )}
          </button>
        </div>
      </div>
    </fieldset>
  );
}
