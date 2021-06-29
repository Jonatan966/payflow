import { AppThemeProvider } from '../contexts/app-theme-provider'
import { GlobalStyles } from '../styles/global'

export default function MyApp ({ Component, pageProps }: any) {
  return (
    <AppThemeProvider>
      <GlobalStyles/>
      <Component {...pageProps} />
    </AppThemeProvider>
  )
}
