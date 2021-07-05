import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb'

import { connectToMongoDatabase } from '../../services/mongodb'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'DELETE') {
    response.setHeader('Allow', 'DELETE')
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

  await billsCollection.deleteOne({
    _id: asTargetBillExists._id
  })

  return response.status(200).end()
}
