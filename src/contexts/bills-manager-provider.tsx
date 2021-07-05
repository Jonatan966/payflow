import Router from 'next/router'
import { ReactNode, useState, createContext } from 'react'
import toast from 'react-hot-toast'

import { Bill } from '../interfaces/bill'
import { api } from '../services/api'

type BillWithoutId = Omit<Bill, '_id'>

type ToastMessage = {
  error: string,
  loading: string,
  success: string
}
interface BillManagerContextProps {
  scannedBill: BillWithoutId | null;
  isSavingBill: boolean;
  addBill: (billData: BillWithoutId) => Promise<boolean>;
  removeBill: (billId: string) => Promise<boolean>;
  getBillByBarcode: (barcode: string, toastMessage: ToastMessage) => Promise<boolean>;
  clearScannedBill: () => void;
  markBillAsPaid: (billId: string) => Promise<boolean>;
}

interface BillsManagerProviderProps {
  children?: ReactNode;
}

export const BillsManagerContext = createContext({} as BillManagerContextProps)

export function BillsManagerProvider ({ children }: BillsManagerProviderProps) {
  const [scannedBill, setScannedBill] = useState<BillWithoutId | null>(null)
  const [isSavingBill, setIsSavingBill] = useState(false)

  const clearScannedBill = () => setScannedBill(null)

  async function addBill ({ name, amount, barcode, dueDate }: BillWithoutId) {
    try {
      const addBill = api.post('/add-bill', {
        name,
        amount: Number(amount),
        barcode,
        dueDate
      })

      setIsSavingBill(true)

      await toast.promise(addBill, {
        error: 'Não foi possível salvar este boleto',
        loading: 'Salvando boleto. . .',
        success: 'Boleto salvo com sucesso!'
      })

      await Router.replace('/')

      return true
    } catch {
      return false
    } finally {
      setIsSavingBill(false)
    }
  }

  async function removeBill (billId: string) {
    try {
      await toast.promise(
        api.delete(`/delete-bill?id=${billId}`),
        {
          error: 'Não foi possível excluir esse boleto',
          loading: 'Excluindo boleto. . .',
          success: 'Boleto excluído com sucesso'
        }
      )

      return true
    } catch {
      return false
    }
  }

  async function getBillByBarcode (barcode: string, toastMessage: ToastMessage) {
    try {
      const checkResult = await toast.promise(
        api.post('/check-barcode', { barcode }),
        toastMessage
      )

      setScannedBill(checkResult.data)

      return true
    } catch {
      return false
    }
  }

  async function markBillAsPaid (billId: string) {
    try {
      await toast.promise(
        api.patch(`/pay-bill?id=${billId}`),
        {
          error: 'Não foi possível marcar esse boleto como pago',
          loading: 'Marcando boleto como pago . . .',
          success: 'Boleto marcado como pago!'
        }
      )

      return true
    } catch {
      return false
    }
  }

  return (
    <BillsManagerContext.Provider value={{
      scannedBill,
      clearScannedBill,
      isSavingBill,
      addBill,
      removeBill,
      getBillByBarcode,
      markBillAsPaid
    }}>
      {children}
    </BillsManagerContext.Provider>
  )
}
