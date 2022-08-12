import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
  Hydrate
} from '@tanstack/react-query'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({});
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {/* <div className='h-screen'>
        </div> */}
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
