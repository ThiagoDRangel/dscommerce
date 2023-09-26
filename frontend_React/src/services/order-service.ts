import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findByIdRequest(id: number) {

  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `/orders/${id}`,
    withCredentials: true
  }

  return requestBackend(config);
}
