import { useSession, signIn, signOut } from 'next-auth/client'
import { ReactNode, createContext } from 'react'

import { CenteredSpinner } from '../components/centered-spinner'
import { User } from '../interfaces/user'

interface AuthContextProps {
  user: User;
  handleSignIn(): Promise<void>;
  handleSignOut(): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider ({ children } : AuthProviderProps) {
  const [session, isLoading] = useSession()

  async function handleSignIn () {
    await signIn('google')
  }

  async function handleSignOut () {
    await signOut({
      redirect: true,
      callbackUrl: '/login'
    })
  }

  if (isLoading) {
    return <CenteredSpinner/>
  }

  return (
    <AuthContext.Provider value={{
      user: session?.user as AuthContextProps['user'],
      handleSignIn,
      handleSignOut,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
