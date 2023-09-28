import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";
import { requestBackend } from "../utils/requests";
import { ProductDTO } from "../models/product";

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

export function deleteById(id: number) {
    return requestBackend({
        url: `/products/${id}`,
        method: "DELETE",
        withCredentials: true });
}

export function updateRequest(obj: ProductDTO) {
    return requestBackend({
        url: `/products/${obj.id}`,
        method: "PUT",
        withCredentials: true,
        data: obj
    });
}