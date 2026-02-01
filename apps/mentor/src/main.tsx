import { createRoot } from 'react-dom/client'
import '@/global.css'
import { Providers } from '@/app/providers'
import { router } from '@/app/router'
import { queryClient } from '@/shared/query/query-client'

createRoot(document.getElementById('root')!).render(
  <Providers router={router} client={queryClient} />
)
