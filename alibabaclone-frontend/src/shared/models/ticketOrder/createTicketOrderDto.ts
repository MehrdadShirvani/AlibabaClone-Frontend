import { CreateTravelerTicketDto } from "./CreateTravelerTicketDto";

export interface CreateTicketOrderDto{
    transportationId: number,
    couponCode : string | null,
    travelers : CreateTravelerTicketDto[]
} 