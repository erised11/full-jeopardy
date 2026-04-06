type InputProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, error, className = "", id, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-base bg-white ${
          error ? "border-red-400" : "border-gray-300"
        } ${className}`}
        {...rest}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
