type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover text-blue-900 font-bold shadow-lg",
  secondary:
    "bg-blue-700/50 hover:bg-blue-600 text-blue-200 hover:text-white",
  danger:
    "bg-red-900/30 hover:bg-danger text-red-300 hover:text-white",
  success:
    "bg-success hover:bg-green-500 text-white font-semibold",
  ghost:
    "border border-gray-300 text-gray-700 hover:bg-gray-50",
  outline:
    "border border-white/60 text-white hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 rounded-lg transition-all
        hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
