import { useContext } from 'react'
import { BillsManagerContext } from '../contexts/bills-manager-provider'

export const useBillsManager = () => useContext(BillsManagerContext)
