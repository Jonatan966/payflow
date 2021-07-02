import { Toaster } from 'react-hot-toast'

import { AppThemeProvider } from '../contexts/app-theme-provider'
import { AuthProvider } from '../contexts/auth-provider'
import { GlobalStyles } from '../styles/global'

export default function MyApp ({ Component, pageProps }: any) {
  return (
    <AppThemeProvider>
      <GlobalStyles/>
      <AuthProvider>
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </AppThemeProvider>
  )
}
