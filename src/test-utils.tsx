// src/test-utils.tsx
import { ReactNode } from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity, // v5 pakai gcTime
      },
    },
  })
}

export function render(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  const client = createTestQueryClient()
  function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

// re-export helpers lainnya dari RTL jika perlu
export * from '@testing-library/react'
