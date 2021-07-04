import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

import { connectToMongoDatabase } from '../../services/mongodb'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'PATCH') {
    response.setHeader('Allow', 'PATCH')
    return response.status(405).end('Method now allowed')
  }

  const { id } = request.query

  const userSession = await getSession({ req: request })
  const userEmail = userSession?.user?.email

  if (!userEmail) {
    return response.status(401).end()
  }

  const { db } = await connectToMongoDatabase()
  const billsCollection = db.collection('bills')

  const storagedUser = await db
    .collection('users')
    .findOne({ email: userEmail })

  const asTargetBillExists = await billsCollection.findOne({
    _id: new ObjectID(String(id)),
    owner: storagedUser._id
  })

  if (!asTargetBillExists) {
    return response.status(400).send({
      message: 'Boleto não encontrado'
    })
  }

  const result = await billsCollection
    .updateOne({ _id: asTargetBillExists._id }, {
      $set: {
        paidIn: new Date().toUTCString()
      }
    })

  if (result.modifiedCount < 1) {
    return response.status(500).send({
      message: 'Ocorreu um erro interno ao tentar marcar este boleto como pago'
    })
  }

  return response.status(200).end()
}
