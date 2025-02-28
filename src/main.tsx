import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' // <--- exported function
import './index.css'
import Banana from './App.tsx' // <--- export default function
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

const store = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={store}>
        <Banana />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)