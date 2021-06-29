import Image from 'next/image'

import { SignInWithGoogleButton } from '../components/sign-in-with-google-button'

import { LoginPageContainer } from '../styles/pages/login-page'

export default function LoginPage () {
  return (
    <LoginPageContainer>
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
