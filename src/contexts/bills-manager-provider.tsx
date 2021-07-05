import Router from 'next/router'
import { ReactNode, useState, createContext } from 'react'
import toast from 'react-hot-toast'

import { Bill } from '../interfaces/bill'
import { api } from '../services/api'

type BillWithoutId = Omit<Bill, 'id'>

interface BillManagerContextProps {
  scannedBill: BillWithoutId | null;
  addBill: (billData: BillWithoutId) => Promise<void>;
  removeBill: (billId: string) => Promise<boolean>;
  getBillByBarcode: (barcode: string) => Promise<boolean>;
  clearScannedBill: () => void;
  markBillAsPaid: (billId: string) => Promise<boolean>;
}

interface BillsManagerProviderProps {
  children?: ReactNode;
}

export const BillsManagerContext = createContext({} as BillManagerContextProps)

export function BillsManagerProvider ({ children }: BillsManagerProviderProps) {
  const [scannedBill, setScannedBill] = useState<Bill | null>(null)

  const clearScannedBill = () => setScannedBill(null)

  async function addBill ({ name, amount, barcode, dueDate }: BillWithoutId) {
    try {
      const addBill = api.post('/add-bill', {
        name,
        amount: Number(amount),
        barcode,
        dueDate
      })

      await toast.promise(addBill, {
        error: 'Não foi possível salvar este boleto',
        loading: 'Salvando boleto. . .',
        success: 'Boleto salvo com sucesso!'
      })

      await Router.replace('/')
    } catch {}
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

  async function getBillByBarcode (barcode: string) {
    try {
      const checkResult = await toast.promise(
        api.post('/check-barcode', { barcode }),
        {
          error: 'Boleto inválido, tente escanear novamente ou insira o código manualmente',
          loading: 'Boleto escaneado! Analisando código de barras',
          success: 'Código de barras analisado com sucesso!'
        }
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
      addBill,
      removeBill,
      getBillByBarcode,
      markBillAsPaid
    }}>
      {children}
    </BillsManagerContext.Provider>
  )
}
