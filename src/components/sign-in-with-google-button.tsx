import Image from 'next/image'

import { SignInWithGoogleButtonContainer } from '../styles/components/sign-in-with-google-button'

export function SignInWithGoogleButton () {
  return (
    <SignInWithGoogleButtonContainer>
      <Image src='/images/google.png' width={24} height={24} />
      <strong></strong>
      <span>Entrar com Google</span>
    </SignInWithGoogleButtonContainer>
  )
}
