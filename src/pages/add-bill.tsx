import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { FaBarcode, FaSearch } from 'react-icons/fa'
import { FiFileText, FiXCircle } from 'react-icons/fi'
import { RiWalletLine } from 'react-icons/ri'

import { TextInput } from '../components/text-input'
import { PageHead } from '../components/page-head'

import { Bill } from '../interfaces/bill'

import { ActionButtonFooterContainer } from '../styles/components/action-buttons-footer'
import { SpinnerContainer } from '../styles/components/spinner'
import { AddBillPageContainer } from '../styles/pages/add-bill-page'
import { useBillsManager } from '../hooks/use-bills-manager'
import { numberToReal } from '../utils/numberToReal'

export default function AddBillPage () {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: {
      errors
    }
  } = useForm()
  const { scannedBill, clearScannedBill, addBill, isSavingBill, getBillByBarcode } = useBillsManager()
  const [isScanningBarcode, setIsScanningBarcode] = useState(false)

  async function handleAddBill ({ name, amount, barcode, dueDate }: Bill) {
    if (!scannedBill) {
      return setError('barcode', {
        message: 'Código inválido'
      })
    }

    const addBillSuccess = await addBill({
      name,
      amount: Number(amount.toString().replace(/R|\$| /g, '').replace(',', '.')),
      barcode,
      dueDate: new Date(`${dueDate.toString().split('/').reverse().join('-')} 00:00`)
    })

    if (!addBillSuccess) {
      return
    }

    await Router.replace('/')
  }

  async function handleGetBillByBarcode () {
    const barcodeField = getValues('barcode')

    if (barcodeField.length < 40) {
      return setError('barcode', {
        message: 'O código deve ter pelo menos 40 caracteres'
      })
    }

    setIsScanningBarcode(true)

    await getBillByBarcode(barcodeField, {
      error: 'Código inválido',
      loading: 'Analisando código. . .',
      success: 'Código analisado!'
    })

    setIsScanningBarcode(false)
  }

  useEffect(() => {
    if (!scannedBill) {
      return
    }

    setValue('dueDate', new Date(scannedBill.dueDate).toLocaleDateString())
    setValue('amount', numberToReal(scannedBill.amount))
    setValue('barcode', scannedBill.barcode)
  }, [scannedBill])

  return (
    <AddBillPageContainer>
      <PageHead title='Adicionar boleto'/>
      <header>
        <h2>Preencha os dados do boleto</h2>
      </header>

      <form onSubmit={handleSubmit(handleAddBill)}>
        <TextInput
          icon={<FiFileText size={25} />}
          placeholder='Nome do boleto'
          required
          {...register('name')}
        />
        <TextInput
          icon={<FiXCircle size={25} />}
          placeholder='Vencimento'
          type='text'
          {...register('dueDate')}
          readOnly
        />
        <TextInput
          icon={<RiWalletLine size={25} />}
          placeholder='Valor'
          type='text'
          readOnly
          {...register('amount')}
        />
        <TextInput
          icon={<FaBarcode size={25} />}
          placeholder='Código'
          required
          error={errors.barcode}
          {...register('barcode')}
          onChange={() => {
            clearErrors('barcode')
            clearScannedBill()
            setValue('dueDate', null)
            setValue('amount', null)
          }}
        >
          <button
            type='button'
            className='hovered'
            title='Buscar informações'
            onClick={handleGetBillByBarcode}
            disabled={isScanningBarcode}
          >
            {isScanningBarcode ? <SpinnerContainer size={25} /> : <FaSearch size={25} />}
          </button>
        </TextInput>

        <ActionButtonFooterContainer>
          {isSavingBill
            ? <SpinnerContainer size={25} />
            : (
              <>
                <button
                  type='button'
                  onClick={() => Router.replace('/')}
                  className='hovered'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='main hovered'
                >
                  Cadastrar
                </button>
              </>
              )
          }
        </ActionButtonFooterContainer>
      </form>
    </AddBillPageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const loggedUserSession = await getSession({ ctx })

  if (!loggedUserSession) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}
