type TextFielCbFnc = (value: string) => void;
interface TextFieldProps {
  name: string;
  labelText?: string;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
  errorMsg?: string;
  initialValue?: string;
  updateCb?: TextFielCbFnc;
}

const TextField = (props: TextFieldProps) => {
  const {
    name,
    labelText,
    type = "text",
    placeholder,
    hasError = false,
    errorMsg,
    initialValue = "",
    updateCb = (value) => null,
  } = props;

  return (
    <section className=".input-section">
      <label htmlFor={name}>{labelText ?? name}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={initialValue}
        onChange={(e) => updateCb(e.currentTarget.value)}
      />
      {hasError ? (
        <div aria-label={`${name}-input-error`}>
          {errorMsg ?? `Please enter valid ${name}`}
        </div>
      ) : null}
    </section>
  );
};

export default TextField;
