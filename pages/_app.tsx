import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext
} from '@tanstack/react-query'

// defaultOptions: {
//   queries: {
//     // 공통 fetch 함수 설정
//     queryFn: ({ queryKey }: QueryFunctionContext) => fetch(queryKey.join("")).then(res => res.json()),
//   },
// },

const queryClient = new QueryClient({});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  ) 
}

export default MyApp
