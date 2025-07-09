export interface CreateTravelerTicketDto{
  id: number ;
  creatorAccountId: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  genderId: number;
  phoneNumber: string;
  birthDate: string; 
  englishFirstName: string | null;
  englishLastName: string | null;
  seatId: number | null;
  isVIP: boolean;
  description: string;
}