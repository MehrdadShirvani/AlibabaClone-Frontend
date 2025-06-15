export interface ProfileDto {
  firstName: string;
  lastName: string;
  accountPhoneNumber: string;
  email: string;

  idNumber: string;
  personPhoneNumber: string;
  birthDate: string | null;

  iban: string;
  bankAccountNumber: string;
  cardNumber: string;

  currentBalance: number;
}