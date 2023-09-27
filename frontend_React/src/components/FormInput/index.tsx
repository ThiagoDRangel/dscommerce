function FormInput(props: any) {

  const { validation, onTurnDirty, ...inputProps } = props;

  return (
    <input { ...inputProps } />
  );
}

export default FormInput;
