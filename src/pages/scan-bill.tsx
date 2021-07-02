import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import Quagga, { QuaggaJSResultObject } from '@ericblade/quagga2'
import Router from 'next/router'

import { ScanBillPageContainer } from '../styles/pages/scan-bill-page'
import { api } from '../services/api'

export default function ScanBillPage () {
  function handleScan (error?: any) {
    if (error) {
      return
    }

    Quagga.start()
  }

  async function onDetectBill (result: QuaggaJSResultObject) {
    const barcode = result.codeResult.code

    if (Number(barcode?.length) <= 40) {
      return
    }

    Quagga.offDetected(onDetectBill)

    try {
      const checkResult = await toast.promise(
        api.post('/check-barcode', { barcode }),
        {
          error: 'Boleto inválido, tente escanear novamente ou insira o código manualmente',
          loading: 'Boleto escaneado! Analisando código de barras',
          success: 'Código de barras analisado com sucesso!'
        }
      )

      await Quagga.stop()
      sessionStorage.setItem('@payflow:scanned-bill', JSON.stringify(checkResult.data))
      Router.push('/add-bill?before-scan=1')
    } catch {
      setTimeout(() => Quagga.onDetected(onDetectBill), 750)
    }
  }

  useEffect(() => {
    const quaggaConfig: any = {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: '#scanner',
        constraints: {
          facingMode: 'environment',
          width: 640,
          height: 360
        }
      },
      frequency: 10,
      decoder: { readers: ['i2of5_reader', '2of5_reader'] }
    }

    Quagga.init(quaggaConfig, handleScan)

    Quagga.onDetected(onDetectBill)

    return () => {
      Quagga.stop()
    }
  }, [])

  return (
    <ScanBillPageContainer>
      <header>
        <Link href='/' passHref>
          <FaArrowLeft size={20} />
        </Link>
        <span>Escaneie o código de barras do boleto</span>
      </header>

      <main id='scanner'>
      </main>

      <footer>
        <h3>Inserir código do boleto</h3>
      </footer>
    </ScanBillPageContainer>
  )
}
