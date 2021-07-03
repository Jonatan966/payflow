import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaArrowLeft, FaBarcode } from 'react-icons/fa'
import { FiFileText, FiXCircle } from 'react-icons/fi'
import { RiWalletLine } from 'react-icons/ri'
import { Boleto } from '@mrmgomes/boleto-utils'

import { TextInput } from '../components/text-input'
import { PageHead } from '../components/page-head'

import { Bill } from '../interfaces/bill'
import { api } from '../services/api'

import { ActionButtonFooterContainer } from '../styles/components/action-buttons-footer'
import { SpinnerContainer } from '../styles/components/spinner'
import { AddBillPageContainer } from '../styles/pages/add-bill-page'

export default function AddBillPage () {
  const [isSavingBill, setIsSavingBill] = useState(false)
  const { register, handleSubmit, setValue } = useForm()

  async function handleAddBill ({ name, amount, barcode, dueDate }: Bill) {
    const addBill = api.post('/add-bill', {
      name,
      amount: Number(amount),
      barcode,
      dueDate
    })

    setIsSavingBill(true)

    const insertResult = await toast.promise(addBill, {
      error: 'Não foi possível salvar este boleto',
      loading: 'Salvando boleto. . .',
      success: 'Boleto salvo com sucesso!'
    })

    if (insertResult.status === 201) {
      await Router.replace('/')
    }

    setIsSavingBill(false)
  }

  useEffect(() => {
    if (!Router.query['before-scan']) {
      return
    }

    const storagedBillData = sessionStorage.getItem('@payflow:scanned-bill')

    if (!storagedBillData) {
      return
    }

    const parsedBillData = JSON.parse(storagedBillData) as Boleto

    setValue('teste', 'bom dia')
    setValue('dueDate', parsedBillData.vencimento.split('T')[0])
    setValue('amount', parsedBillData.valor)
    setValue('barcode', parsedBillData.linhaDigitavel)

    sessionStorage.removeItem('@payflow:scanned-bill')
  }, [])

  return (
    <AddBillPageContainer>
      <PageHead title='Adicionar boleto'/>
      <header>
        <FaArrowLeft size={20} onClick={() => Router.back()} />
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
          type='date'
          required
          {...register('dueDate')}
        />
        <TextInput
          icon={<RiWalletLine size={25} />}
          placeholder='Valor'
          type='number'
          step='any'
          required
          {...register('amount')}
        />
        <TextInput
          icon={<FaBarcode size={25} />}
          placeholder='Código'
          required
          {...register('barcode')}
        />

        <ActionButtonFooterContainer>
          {isSavingBill
            ? <SpinnerContainer size={25} />
            : (
              <>
                <button
                  type='button'
                  onClick={() => Router.replace('/')}
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='main'
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
        destination: '/',
        permanent: false
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}
