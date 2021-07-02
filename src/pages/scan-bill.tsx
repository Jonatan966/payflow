import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Quagga, { QuaggaJSConfigObject, QuaggaJSResultObject } from '@ericblade/quagga2'
import Router from 'next/router'

import { ScanBillPageContainer } from '../styles/pages/scan-bill-page'
import { api } from '../services/api'

export default function ScanBillPage () {
  const [isProcessing, setIsProcessing] = useState(false)

  function handleScan (error?: any) {
    if (error) {
      return
    }

    Quagga.start()
  }

  async function onDetectBill (result: QuaggaJSResultObject) {
    const barcode = result.codeResult.code

    console.log(barcode, barcode?.length)

    if (Number(barcode?.length) <= 40 || isProcessing) {
      return
    }

    Quagga.offDetected(onDetectBill)

    setIsProcessing(true)

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
      setTimeout(() => {
        Quagga.onDetected(onDetectBill)
        setIsProcessing(false)
      }, 1000)
    }
  }

  useEffect(() => {
    const quaggaConfig: QuaggaJSConfigObject = {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: '#scanner',
        constraints: {
          facingMode: 'environment',
          width: 640,
          height: 360,
          aspectRatio: {
            min: 1,
            max: 2
          }
        },
        area: {
          bottom: '20%',
          top: '20%'
        },
        singleChannel: true
      },
      frequency: 5,
      numOfWorkers: navigator.hardwareConcurrency || 4,
      locator: {
        patchSize: 'medium',
        halfSample: true
      },
      decoder: {
        readers: ['i2of5_reader', '2of5_reader']
      }
    }

    Quagga.init(quaggaConfig, handleScan)

    Quagga.onDetected(onDetectBill)
  }, [])

  return (
    <ScanBillPageContainer>
      <header>
        <FaArrowLeft
          size={20}
          onClick={() => Router.back()}
          title='Voltar'
          className='hovered'
        />

        <span>Escaneie o código de barras do boleto</span>
      </header>

      <main id='scanner'>
      </main>

      <button type='button' className='hovered'>
        <h3>Inserir código do boleto manualmente</h3>
      </button>
    </ScanBillPageContainer>
  )
}
