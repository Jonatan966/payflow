export interface Bill {
  name: string;
  amount: number;
  dueDate: Date;
  paidIn?: Date;
  barcode: string;
  id: string;
}
