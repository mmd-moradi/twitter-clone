interface ButtonProps {
    label: string;
    secondarey?: boolean;
    fullwidth?: boolean;
    large?: boolean;
    onClick: () => void;
    disabled?: boolean;
    outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    secondarey,
    fullwidth,
    large,
    onClick,
    disabled,
    outline,
}) => {
  return (
    <button disabled={disabled} onClick={onClick} className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80
    ${fullwidth ? "w-full" : "w-fit"}
    ${secondarey ? "bg-white" : "bg-sky-500"}
    ${secondarey ? "text-black" : "text-white"}
    ${secondarey ? "border-black" : "border-sky-500"}
    ${large ? "text-xl" : "text-md"}
    ${large ? "px-5" : "px-4"}
    ${large ? "py-3" : "py-2"}
    ${outline ? "border-[2px]" : ""}
    ${outline ? "bg-transparent" : ""}
    ${outline ? "border-white" : ""}
    ${outline ? "text-white" : ""}
    `}
    >
        {label}
    </button>
  )
}

export default Button