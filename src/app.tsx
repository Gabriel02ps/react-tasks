import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  return (
  <div className='bg-custom-blue h-screen text-white p-4'>
    <Toaster richColors closeButton/>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />  
    </QueryClientProvider>
  </div>
  )
}

