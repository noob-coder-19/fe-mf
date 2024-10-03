type Props = {
  id: string;
  htmlFor: string;
  label: string;
  inputType?: string;
  placeholder?: string;
  value?: string | number;
  readOnly?: boolean;
  onChange?: (value: string | number) => void;
};

const InputWithLabel = ({
  inputType = "number",
  placeholder = "",
  ...props
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-300 text-xs" htmlFor={props.htmlFor}>
        {props.label}
      </label>

      <input
        type={inputType}
        id={props.id}
        placeholder={placeholder}
        className="bg-white/10 py-2 px-4 rounded-lg text-2xl"
        value={props.value}
        readOnly={props.readOnly}
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
      />
    </div>
  );
};

export default InputWithLabel;
