import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/Home.jsx'
import ProductPage from './pages/Product.jsx'
import CartPage from './pages/Cart.jsx'
import CheckoutPage from './pages/Checkout.jsx'
import NotFoundPage from './pages/NotFound.jsx'
import ToastProvider from './providers/ToastProvider.jsx'

// route config - App is the layout, children are the pages
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:productId', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: '*', element: <NotFoundPage /> }, // catch-all for 404
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>,
)
