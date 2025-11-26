import type { InputHTMLAttributes } from "react";

// os inputs vão ter as propriedades do InputHTMLAttributes<HTMLInputElement>
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
// recebendo as propriedades do InputHTMLAttributes<HTMLInputElement>
function Input(props: InputProps) {
  return (
    <input
      className="border-0 h-9 rounded-md outline-none px-2 mb-3 bg-white"
      {...props} // colocando aqui as prop do InputHTMLAttributes<HTMLInputElement>
    />
  );
}

export default Input;
