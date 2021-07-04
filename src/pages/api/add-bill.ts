import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

import { Bill } from '../../interfaces/bill'
import { connectToMongoDatabase } from '../../services/mongodb'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).end('Method now allowed')
  }

  const { name, amount, barcode, dueDate } = request.body as Omit<Bill, 'id' | 'paidIn'>
  const userSession = await getSession({ req: request })

  const userEmail = userSession?.user?.email

  if (!userEmail) {
    return response.status(401).end()
  }

  const { db } = await connectToMongoDatabase()

  const storagedUser = await db
    .collection('users')
    .findOne({ email: userEmail })

  const billData = {
    name,
    amount,
    barcode,
    dueDate,
    owner: storagedUser._id
  }

  const insertResult = await db
    .collection('bills')
    .insertOne(billData)

  return response.status(201).json({
    ...billData,
    _id: insertResult.insertedId
  })
}
