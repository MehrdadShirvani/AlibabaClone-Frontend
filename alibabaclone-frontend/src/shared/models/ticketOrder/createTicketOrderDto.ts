import { CreateTravelerTicketDto } from "./createTravelerTicketDto";

export interface CreateTicketOrderDto{
    transportationId: number,
    couponCode : string | null,
    travelers : CreateTravelerTicketDto[]
} 