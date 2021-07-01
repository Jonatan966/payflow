import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { FaunaAdapter } from '@next-auth/fauna-adapter'

import { faunaClient } from '../../../services/fauna'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_PROVIDER_ID,
      clientSecret: process.env.GOOGLE_PROVIDER_SECRET
    })
  ],
  adapter: FaunaAdapter({ faunaClient: faunaClient })
})
