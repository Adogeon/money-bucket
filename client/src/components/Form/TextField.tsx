interface TextFieldProps {
  hasError: boolean
  errorMsg?: string
}

const TextField = (props: TextFieldProps) => {
  return (
    <section className=".input-section">
      <label htmlFor="label">Label</label>
      <input id="label" type="text"/>
      {props.hasError ? <small>error-text</small> : <></> }
    </section>
  );
};

TextField.defaultProps = {
  hasError: false
}

export default TextField;
