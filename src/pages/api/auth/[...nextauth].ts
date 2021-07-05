import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_PROVIDER_ID,
      clientSecret: process.env.GOOGLE_PROVIDER_SECRET
    })
  ],
  adapter: Adapters.TypeORM.Adapter({
    type: 'mongodb',
    url: process.env.MONGODB_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})
