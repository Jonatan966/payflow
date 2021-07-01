import { FaArrowLeft, FaBarcode } from 'react-icons/fa'
import { FiFileText, FiXCircle } from 'react-icons/fi'
import { RiWalletLine } from 'react-icons/ri'

import { TextInput } from '../components/text-input'
import { ActionButtonFooterContainer } from '../styles/components/action-buttons-footer'
import { AddBillPageContainer } from '../styles/pages/add-bill-page'

export default function AddBillPage () {
  return (
    <AddBillPageContainer>
      <header>
        <FaArrowLeft size={20} />
        <h2>Preencha os dados do boleto</h2>
      </header>

      <form>
        <TextInput
          icon={<FiFileText size={25} />}
          placeholder='Nome do boleto'
        />
        <TextInput
          icon={<FiXCircle size={25} />}
          placeholder='Vencimento'
        />
        <TextInput
          icon={<RiWalletLine size={25} />}
          placeholder='Valor'
          type='number'
        />
        <TextInput
          icon={<FaBarcode size={25} />}
          placeholder='Código'
        />

        <ActionButtonFooterContainer>
          <button>Cancelar</button>
          <button className='main'>Cadastrar</button>
        </ActionButtonFooterContainer>
      </form>
    </AddBillPageContainer>
  )
}
