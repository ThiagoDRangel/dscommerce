function FormInput(props: any) {

  const { validation, invalid, onTurnDirty, ...inputProps } = props;

  return (
    <input { ...inputProps } data-invalid={invalid} />
  );
}

export default FormInput;
