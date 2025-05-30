import axios, { AxiosResponse } from 'axios';
import { TransportationSearchRequest } from '../models/transportation/transportationSearchRequest';
import { TransportationSearchResult } from '../models/transportation/transportationSearchResult';
import { City } from '../models/location/city';
import { RegisterRequestDto } from '../models/authentication/RegisterRequestDto';
import { LoginRequestDto } from '../models/authentication/LoginRequestDto';

axios.defaults.baseURL = 'https://localhost:44377/api';

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

const Cities = {
    list: () => request.get<City[]>('/city'),
}
const Auth = {
register: (data: RegisterRequestDto) =>
    request.post<{ token: string }>('/auth/register', data),
  login: (data: LoginRequestDto) =>
    request.post<{ token: string }>('/auth/login', data),
};

const agent = {
    TransportationSearch,
    Cities,
    Auth
}



export default agent;