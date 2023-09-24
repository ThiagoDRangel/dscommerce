import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";
import { requestBackend } from "../utils/requests";

export function findPageRequest(page: number, name: string, size = 12, sort = "name") {
    const config: AxiosRequestConfig = {
        method: "GET",
        baseURL: BASE_URL,
        url: "/products",
        params: {
            page,
            name,
            size,
            sort
        }
    }
    return axios(config);
}

export function findById(id: number) {
   return requestBackend({ url: `/products/${id}` });
}
