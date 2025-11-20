import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import OrderSummary from '../components/OrderSummary'
import StateMessage from '../components/StateMessage'
import { selectCartTotal, useCartStore } from '../store/cart'
import useToast from '../hooks/useToast'
import { downloadInvoice } from '../utils/invoice'

const INITIAL_FORM = {
  name: '',
  email: '',
  address: '',
  city: '',
  postal: '',
  upi: '',
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const total = useCartStore(selectCartTotal)
  const clearCart = useCartStore((state) => state.clearCart)
  const toast = useToast()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | success
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [lastOrder, setLastOrder] = useState(null) // store order data for invoice download

  const isDisabled = useMemo(() => items.length === 0, [items.length])
  const shipping = total > 0 ? 7.5 : 0 // flat shipping fee

  if (items.length === 0 && status !== 'success') {
    return (
      <StateMessage
        title="Nothing to checkout"
        message="Add a few items to your cart before visiting checkout."
        actionLabel="Browse catalog"
        onAction={() => navigate('/')}
      />
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  // basic validation - could be more robust but this works for now
  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Provide a valid email.'
    if (!form.address.trim()) nextErrors.address = 'Address is required.'
    if (!form.city.trim()) nextErrors.city = 'City is required.'
    if (!form.postal.trim()) nextErrors.postal = 'Postal code is required.'
    if (paymentMethod === 'upi' && !form.upi.trim()) {
      nextErrors.upi = 'UPI ID is required.'
    }
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validation = validate()
    setErrors(validation)

    if (Object.keys(validation).length > 0) return

    // build order object for invoice
    const orderItems = items.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }))
    const orderId = `NU-${Date.now().toString().slice(-6)}` // simple ID from timestamp
    const orderDate = new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date())

    setLastOrder({
      orderId,
      date: orderDate,
      customer: {
        name: form.name,
        address: form.address,
        city: form.city,
        postal: form.postal,
        email: form.email,
      },
      items: orderItems,
      paymentMethod,
      upi: paymentMethod === 'upi' ? form.upi : null,
      totals: {
        subtotal: total,
        shipping,
        grandTotal: total + shipping,
      },
    })

    clearCart()
    setForm(INITIAL_FORM)
    setStatus('success')
    toast({
      title: 'Order placed',
      description: 'We emailed your confirmation.',
      variant: 'success',
    })
  }

  return (
    <section>
      <PageTitle
        title="Checkout"
        subtitle="Delivering pan-India · COD and UPI accepted."
      />

      {status === 'success' && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <span>Order placed successfully! We emailed a confirmation receipt.</span>
          {lastOrder && (
            <button
              type="button"
              onClick={() => downloadInvoice(lastOrder)}
              className="rounded-full border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              Download Invoice (PDF)
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:[grid-template-columns:1.4fr_1fr]">
        <section className="space-y-5 rounded-2xl border border-stone-200 bg-white p-5 text-stone-900 shadow-sm shadow-stone-900/5">
          <p className="text-sm font-semibold text-stone-700">Shipping Details</p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              {['name', 'email', 'address', 'city', 'postal'].map((field) => (
                <label key={field} className="block text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
                  {field === 'postal'
                    ? 'PIN Code'
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                  <input
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className={`mt-2 w-full rounded-xl border px-3 py-2 text-sm text-stone-900 outline-none ${
                      errors[field]
                        ? 'border-rose-300 bg-rose-50'
                        : 'border-stone-200 bg-stone-50'
                    }`}
                    type={field === 'email' ? 'email' : 'text'}
                  />
                  {errors[field] && <p className="mt-1 text-xs text-rose-500">{errors[field]}</p>}
                </label>
              ))}
            </div>

            <div className="space-y-3 rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
                Payment Method
              </p>
              <label className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                />
                UPI (GPay / PhonePe / Paytm)
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                Cash on Delivery
              </label>

              {paymentMethod === 'upi' && (
                <label className="block text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
                  UPI ID
                  <input
                    name="upi"
                    value={form.upi}
                    onChange={handleChange}
                    placeholder="name@upi"
                    className={`mt-2 w-full rounded-xl border px-3 py-2 text-sm text-stone-900 outline-none ${
                      errors.upi ? 'border-rose-300 bg-rose-50' : 'border-stone-200 bg-white'
                    }`}
                  />
                  {errors.upi && <p className="mt-1 text-xs text-rose-500">{errors.upi}</p>}
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="w-full rounded-xl bg-orange-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-stone-400"
            >
              Place Order
            </button>
          </form>
        </section>

        <div className="space-y-4">
          <OrderSummary items={items} total={total} />
          <div className="rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-600 shadow-sm shadow-stone-900/5">
            <p className="text-sm font-semibold text-stone-800">Need help?</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-stone-400">Care</p>
            <p>+91 80 4000 0000 · care@nuance.store</p>
            <p className="mt-2 text-xs text-stone-400">Delivery timelines: Metros 2-3 days · Rest 4-6 days.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

