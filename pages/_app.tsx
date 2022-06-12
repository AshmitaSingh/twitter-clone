import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    // This will keep a check on our logged in state through out our session
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
