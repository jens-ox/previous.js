import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home'
import RootRoute from './routes/Root'
import AboutRoute from './routes/About'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <AboutRoute />
      }
    ]
  }
])

export function createApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
