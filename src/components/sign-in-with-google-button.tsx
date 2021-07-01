import Image from 'next/image'

import { SignInWithGoogleButtonContainer } from '../styles/components/sign-in-with-google-button'
import { useAuth } from '../hooks/use-auth'

export function SignInWithGoogleButton () {
  const { handleSignIn } = useAuth()

  return (
    <SignInWithGoogleButtonContainer onClick={handleSignIn}>
      <Image src='/images/google.png' width={24} height={24} />
      <strong></strong>
      <span>Entrar com Google</span>
    </SignInWithGoogleButtonContainer>
  )
}
