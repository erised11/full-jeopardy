type ButtonProps = {
  text: string;
  variant?: "fill" | "nofill";
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ onClick, text, variant = "nofill" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2  text-black rounded hover:cursor-pointer disabled:bg-gray-300 ${
        variant === "fill"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-white border-gray-200 border-1 hover:bg-gray-200"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
