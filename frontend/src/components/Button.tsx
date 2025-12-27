type ButtonProps = {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-48 p-4 bg-white text-black rounded-xl"
    >
      {text}
    </button>
  );
};

export default Button;
