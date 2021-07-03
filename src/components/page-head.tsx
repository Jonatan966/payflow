import Head from 'next/head'
import { ReactNode } from 'react'

interface PageHeadProps {
  title: string;
  children?: ReactNode;
}

export function PageHead ({ title, children }: PageHeadProps) {
  return (
    <Head>
      <title>Payflow | {title}</title>
      {children}
    </Head>
  )
}
