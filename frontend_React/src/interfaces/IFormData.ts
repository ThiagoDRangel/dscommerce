import { CategoryDTO } from "../models/Category";

type ValidationFunction<T> = (value: T) => boolean;

export default interface FormData {
  [key: string]: {
    value: string | number | CategoryDTO[];
    id: string;
    name: string;
    type: string;
    placeholder?: string;
    validation?: ValidationFunction<never>;
    message?: string;
  };
}