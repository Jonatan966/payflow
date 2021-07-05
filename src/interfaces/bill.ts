export interface Bill {
  name: string;
  amount: number;
  dueDate: Date;
  paidIn?: string;
  barcode: string;
  _id: string;
}
