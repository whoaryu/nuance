import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MainMenu from './pages/MainMenu.jsx'
import HomePage from './pages/Home.jsx'
import ProductPage from './pages/Product.jsx'
import CartPage from './pages/Cart.jsx'
import CheckoutPage from './pages/Checkout.jsx'
import ReactFlowDemo from './pages/ReactFlowDemo.jsx'
import NotFoundPage from './pages/NotFound.jsx'
import ToastProvider from './providers/ToastProvider.jsx'

// route config
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />,
  },
  {
    path: '/shop',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:productId', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
    ],
  },
  {
    path: '/reactflow-demo',
    element: <ReactFlowDemo />,
  },
  {
    path: '*',
    element: <NotFoundPage />, // catch-all for 404
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>,
)
