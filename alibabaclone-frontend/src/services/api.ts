import axios, { AxiosResponse } from 'axios';
import { TransportationSearchRequest } from '../shared/models/transportation/transportationSearchRequest';
import { TransportationSearchResult } from '../shared/models/transportation/transportationSearchResult';
import { City } from '../shared/models/location/city';
import { RegisterRequestDto } from '../shared/models/authentication/RegisterRequestDto';
import { LoginRequestDto } from '../shared/models/authentication/LoginRequestDto';
import { AuthResponseDto } from '../shared/models/authentication/AuthResponseDto';
import { ProfileDto } from '../shared/models/account/ProfileDto';
import { EditEmailDto } from '../shared/models/account/EditEmailDto';
import { EditPasswordDto } from '../shared/models/account/EditPasswordDto';
import { PersonDto } from '../shared/models/account/PersonDto';
import { UpsertBankAccountDetailDto } from '../shared/models/account/UpsertBankAccountDetailDto';
import { TravelerTicketDto } from '../shared/models/transportation/TravelerTicketDto';
import { TicketOrderSummaryDto } from '../shared/models/transportation/TicketOrderSummaryDto';
import { useAuthStore } from '@/stores/useAuthStore';
import { TransactionDto } from '../shared/models/transaction/TransactionDto';
import { CreateTicketOrderDto } from '../shared/models/ticketOrder/createTicketOrderDto';
import { TopUpDto } from '../shared/models/account/topUpDto';
import { TransportationSeatDto } from '../shared/models/transportation/transportationSeatDto';
import { DiscountDto } from '../shared/models/transaction/discountDto';
import { CouponValidationRequestDto } from '../shared/models/transaction/couponValidationRequestDto';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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
  create: (data : CreateTicketOrderDto) => request.post<number>('/ticketOrder/create', data),
  downloadPdf: (ticketOrderId : number) => request.get<Blob>(`/ticketOrder/${ticketOrderId}/pdf`, {
      responseType: 'blob',
    }),
}

const Coupon = {
  validate: (data : CouponValidationRequestDto) => request.post<DiscountDto>('/coupon/validate', data),
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
  topUp: (data : TopUpDto) => request.post<number>('/account/top-up', data)
};


const TransportationSearch = {
    search: (data: TransportationSearchRequest) => request.post<TransportationSearchResult[]>('/transportation/search', data),
    getSeats: (transportationId: number) => 
      request.get<TransportationSeatDto[]>(`/transportation/${transportationId}/seats`)
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

const api = {
  TicketOrder,
  Profile,
  TransportationSearch,
  Cities,
  Auth,
  Coupon
}

export default api;