import { Toaster } from 'react-hot-toast'

import { AppThemeProvider } from '../contexts/app-theme-provider'
import { AuthProvider } from '../contexts/auth-provider'
import { BillsManagerProvider } from '../contexts/bills-manager-provider'
import { GlobalStyles } from '../styles/global'

export default function MyApp ({ Component, pageProps }: any) {
  return (
    <AppThemeProvider>
      <GlobalStyles/>
      <AuthProvider>
        <BillsManagerProvider>
          <Toaster />
          <Component {...pageProps} />
        </BillsManagerProvider>
      </AuthProvider>
    </AppThemeProvider>
  )
}
