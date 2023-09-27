export function update(inputs: any, name: string, newValue: any) {
  return {
    ...inputs,
    [name]: { ...inputs[name], value: newValue}
  }
}

export function toValues(inputs: any) {
  const data: any = {};
  for (const name in inputs) {
    data[name] = inputs[name].value;
  }
  return data;
}

export function updateAll(inputs: any, newValues: any) {
  const newInputs: any = {};
  for (const name in inputs) {
    newInputs[name] = { ...inputs[name], value: newValues[name] };
  }
  return newInputs;
}