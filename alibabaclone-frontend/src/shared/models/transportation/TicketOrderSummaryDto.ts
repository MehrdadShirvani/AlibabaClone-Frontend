export interface TicketOrderSummaryDto {
  id: number;
  serialNumber: string;
  boughtAt: string;
  totalPrice: number;

  travelStartDate: string;
  travelEndDate?: string;

  fromCity: string;
  toCity: string;

  companyName: string;
  companyLogo: string;

  vehicleTypeId: number;
  vehicleName: string;
}