export default interface FormData {
  [key: string]: {
    value: string;
    id: string;
    name: string;
    type: string;
    placeholder?: string;
    validation?: (value: string) => boolean;
    message?: string;
  };
}