import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {
  QueryClient,
  QueryClientProvider,
  Hydrate
} from '@tanstack/react-query'
import { store } from '@store/index'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({});
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default MyApp
