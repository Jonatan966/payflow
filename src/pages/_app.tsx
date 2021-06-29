import { AppThemeProvider } from '../contexts/app-theme-provider'

export default function MyApp ({ Component, pageProps }: any) {
  return (
    <AppThemeProvider>
      <Component {...pageProps} />
    </AppThemeProvider>
  )
}
