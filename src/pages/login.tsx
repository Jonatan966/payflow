import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Image from 'next/image'

import { PageHead } from '../components/page-head'
import { SignInWithGoogleButton } from '../components/sign-in-with-google-button'

import { LoginPageContainer } from '../styles/pages/login-page'

export default function LoginPage () {
  return (
    <LoginPageContainer>
      <PageHead title='Login'/>
      <header>
        <Image src='/images/person.png' width={185} height={350} />
        <span className="shadow"/>
      </header>
      <main>
        <Image src='/images/logomini.png' width={72} height={44} />

        <h1>Organize seus boletos em um só lugar</h1>

        <SignInWithGoogleButton/>
      </main>
    </LoginPageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const loggedUserSession = await getSession({ ctx })

  if (loggedUserSession) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}
