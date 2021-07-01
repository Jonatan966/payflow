import * as Fauna from 'faunadb'

export const faunaClient = new Fauna.Client({
  secret: process.env.FAUNADB_SECRET || ''
})
