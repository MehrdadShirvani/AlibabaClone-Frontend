import { createTravelerTicketDto } from "./createTravelerTicketDto";

export interface createTicketOrderDto{
    transportationId: number,
    couponId : number | null,
    travelers : createTravelerTicketDto[]
} 