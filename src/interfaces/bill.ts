export interface Bill {
  name: string;
  amount: number;
  dueDate: Date;
  paidIn?: string;
  barcode: string;
  id: string;
}
