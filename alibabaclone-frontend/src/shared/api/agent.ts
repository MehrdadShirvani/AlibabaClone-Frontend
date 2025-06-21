import axios, { AxiosResponse } from 'axios';
import { TransportationSearchRequest } from '../models/transportation/transportationSearchRequest';
import { TransportationSearchResult } from '../models/transportation/transportationSearchResult';
import { City } from '../models/location/city';
import { RegisterRequestDto } from '../models/authentication/RegisterRequestDto';
import { LoginRequestDto } from '../models/authentication/LoginRequestDto';
import { AuthResponseDto } from '../models/authentication/AuthResponseDto';
import { ProfileDto } from '../models/account/ProfileDto';
import { EditEmailDto } from '../models/account/EditEmailDto';
import { EditPasswordDto } from '../models/account/EditPasswordDto';
import { PersonDto } from '../models/account/PersonDto';
import { UpsertBankAccountDetailDto } from '../models/account/UpsertBankAccountDetailDto';
import { TravelerTicketDto } from '../models/transportation/TravelerTicketDto';
import { TicketOrderSummaryDto } from '../models/transportation/TicketOrderSummaryDto';
import { useAuthStore } from '@/store/authStore';
import { TransactionDto } from '../models/transaction/TransactionDto';
import { createTicketOrderDto } from '../models/ticketOrder/createTicketOrderDto';
import { topUpDto } from '../models/account/topUpDto';
import { transportationSeatDto } from '../models/transportation/transportationSeatDto';

axios.defaults.baseURL = 'https://localhost:44377/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string, config = {}) =>  axios.get<T>(url, config).then(responseBody),
    post: <T>(url: string, body: {}, config = {}) => axios.post<T>(url, body, config).then(responseBody),
    put: <T>(url: string, body: {}, config = {}) => axios.put<T>(url, body, config).then(responseBody),
    delete: <T>(url: string, config = {}) => axios.delete<T>(url, config).then(responseBody)
}


axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout(); // TODO: redirect
    }
    return Promise.reject(error);
  }
);

const TicketOrder = {
  create: (data : createTicketOrderDto) => request.post<number>('/ticketOrder/create', data),
  downloadPdf: (ticketOrderId : number) => request.get<Blob>(`/ticketOrder/${ticketOrderId}/pdf`, {
      responseType: 'blob',
    }),
}
const Profile = {
  getProfile: () => request.get<ProfileDto>('/account/profile'),
  editEmail: (data: EditEmailDto) => request.put<void>('/account/email', data),
  editPassword: (data: EditPasswordDto) => request.put<void>('/account/password', data),
  upsertAccountPerson: (data: PersonDto) => request.post<number>('/account/account-person', data),
  upsertPerson: (data: PersonDto) => request.post<number>('/account/person', data),
  upsertBankDetail: (data: UpsertBankAccountDetailDto) =>
    request.post<void>('/account/bank-detail', data),
  getMyPeople: () => request.get<PersonDto[]>('/account/my-people'),
  getMyTravels: () => request.get<TicketOrderSummaryDto[]>('/account/my-travels'),
  getTravelOrderDetails: (ticketOrderId: number) =>
    request.get<TravelerTicketDto[]>(`/account/my-travels/${ticketOrderId}`),
  getMyTransactions: () => request.get<TransactionDto[]>('/account/my-transactions'), 
  topUp: (data : topUpDto) => request.post<number>('/account/top-up', data)
};


const TransportationSearch = {
    search: (data: TransportationSearchRequest) => request.post<TransportationSearchResult[]>('/transportation/search', data),
}

const Cities = {
    list: () => request.get<City[]>('/city'),
}
const Auth = {
  register: (data: RegisterRequestDto) =>
    request.post<AuthResponseDto>('/auth/register', data),
  login: (data: LoginRequestDto) =>
    request.post<AuthResponseDto>('/auth/login', data),
};

const agent = {
  TicketOrder,
  Profile,
  TransportationSearch,
  Cities,
  Auth
}



export default agent;