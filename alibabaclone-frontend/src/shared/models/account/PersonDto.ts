export interface PersonDto {
  id: number;
  creatorAccountId: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  genderId: number;
  phoneNumber: string;
  birthDate: string | Date | null; 
  englishFirstName: string;
  englishLastName: string;
}