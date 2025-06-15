export interface TransactionDto {
  id: number;
  createdAt: string | Date; 
  transactionTypeId: number;
  transactionType: string;
  description: string;
  finalAmount: number;
}
