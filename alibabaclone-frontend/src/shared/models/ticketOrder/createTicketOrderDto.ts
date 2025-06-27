import { createTravelerTicketDto } from "./createTravelerTicketDto";

export interface createTicketOrderDto{
    transportationId: number,
    couponCode : string | null,
    travelers : createTravelerTicketDto[]
} 