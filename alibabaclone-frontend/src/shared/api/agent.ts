import axios, { AxiosResponse } from 'axios';
import { TransportationSearchRequest } from '../models/transportation/transportationSearchRequest';
import { TransportationSearchResult } from '../models/transportation/transportationSearchResult';

axios.defaults.baseURL = 'https://localhost:44337/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const TransportationSearch = {
    search: (data: TransportationSearchRequest) => request.post<TransportationSearchResult[]>('/transportation/search', data),
}

const agent = {
    TransportationSearch 
}

export default agent;