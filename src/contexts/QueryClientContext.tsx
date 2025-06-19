import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions:{queries:{staleTime:6000, gcTime: 10 * (60*1000)}}
  })


type Props = {
    children:React.ReactNode
}

function ClientQueryProvider({children}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default ClientQueryProvider