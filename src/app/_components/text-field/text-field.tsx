import { TextFieldProps } from "./text-field.types";

const TextField: React.FC<TextFieldProps> = ({ icon: Icon, type = "text", error, ...rest }) => {
  return (
    <div>
      <label className="flex w-full gap-x-2 rounded">
        {Icon && <Icon />}
        <input type={type} {...rest} className="auth-input" />
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextField;
