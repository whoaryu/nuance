import { formatCurrency } from './format'

const COMPANY = {
  name: 'Nuance Retail Pvt. Ltd.',
  addressLine1: '3rd Floor, Bandra Kurla Complex',
  addressLine2: 'Mumbai, Maharashtra 400051',
  gst: 'GSTIN: 29AABCU9603R1ZN',
  support: 'support@nuance.store · +91 80 4000 0000',
}

function buildInvoiceHTML(order) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Nuance Invoice</title>
    <style>
      body { font-family: 'Inter', 'Segoe UI', sans-serif; margin: 0; padding: 24px; color: #1f2933; }
      h1 { margin: 0; font-size: 20px; }
      .header, .footer { display: flex; justify-content: space-between; align-items: center; }
      .section { margin-top: 24px; }
      table { width: 100%; border-collapse: collapse; margin-top: 12px; }
      th, td { padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: left; font-size: 12px; }
      th { background: #f9fafb; text-transform: uppercase; letter-spacing: 1px; font-size: 11px; color: #6b7280; }
      .totals { width: 40%; margin-left: auto; }
      .totals td { border: none; }
      .badge { display: inline-flex; padding: 4px 10px; background: #f3f4f6; border-radius: 999px; font-size: 11px; }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <h1>Nuance Retail Pvt. Ltd.</h1>
        <p>${COMPANY.addressLine1}<br/>${COMPANY.addressLine2}<br/>${COMPANY.gst}</p>
      </div>
      <div class="badge">Tax Invoice</div>
    </div>

    <div class="section">
      <strong>Order ID:</strong> ${order.orderId}<br/>
      <strong>Order Date:</strong> ${order.date}
    </div>

    <div class="section">
      <strong>Bill To:</strong><br/>
      ${order.customer.name}<br/>
      ${order.customer.address}<br/>
      ${order.customer.city} - ${order.customer.postal}<br/>
      ${order.customer.email}
    </div>

    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${order.items
          .map(
            (item) => `
              <tr>
                <td>${item.title}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
              </tr>`,
          )
          .join('')}
      </tbody>
    </table>

    <table class="totals">
      <tr>
        <td>Subtotal</td>
        <td>${formatCurrency(order.totals.subtotal)}</td>
      </tr>
      <tr>
        <td>Shipping</td>
        <td>${formatCurrency(order.totals.shipping)}</td>
      </tr>
      <tr>
        <td><strong>Grand Total</strong></td>
        <td><strong>${formatCurrency(order.totals.grandTotal)}</strong></td>
      </tr>
    </table>

    <div class="section">
      <strong>Payment:</strong>
      ${
        order.paymentMethod === 'upi'
          ? `Paid via UPI (${order.upi || '—'})`
          : 'Cash on delivery'
      }
    </div>

    <div class="footer">
      <p>${COMPANY.support}</p>
      <span class="badge">Made in India · Dhanyavaad</span>
    </div>
  </body>
</html>
`
}

export function downloadInvoice(order) {
  if (!order) return

  const html = buildInvoiceHTML(order)
  const invoiceWindow = window.open('', '_blank')
  invoiceWindow.document.write(html)
  invoiceWindow.document.close()
  invoiceWindow.focus()
  invoiceWindow.print()
}

