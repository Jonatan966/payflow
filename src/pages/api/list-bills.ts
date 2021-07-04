import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

import { connectToMongoDatabase } from '../../services/mongodb'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const userSession = await getSession({ req: request })
  const userEmail = userSession?.user?.email

  let { mode = 'all' } = request.query as { mode: 'all' | 'pendents' | 'extract' }

  if (!['all', 'pendents', 'extract'].includes(mode)) {
    mode = 'all'
  }

  if (!userEmail) {
    return response.status(401).end()
  }

  const { db } = await connectToMongoDatabase()

  const storagedUser = await db
    .collection('users')
    .findOne({ email: userEmail })

  const searchBillQuery: any = {}

  if (mode === 'extract') {
    searchBillQuery.paidIn = {
      $exists: true
    }
  }

  if (mode === 'pendents') {
    searchBillQuery.paidIn = {
      $exists: false
    }
  }

  const bills = await db.collection('bills').find({
    owner: storagedUser._id,
    ...searchBillQuery
  }).toArray()

  return response.json({
    results: bills
  })
}
