import { NextApiRequest, NextApiResponse } from 'next'
import { validarBoleto } from '@mrmgomes/boleto-utils'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).end('Method now allowed')
  }

  const { barcode } = request.body

  const billData = validarBoleto(barcode)

  if (!billData.sucesso) {
    return response
      .status(400)
      .json({
        message: 'Boleto inválido'
      })
  }

  return response.status(200).json(billData)
}
