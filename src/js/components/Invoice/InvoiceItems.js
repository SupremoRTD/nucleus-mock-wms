import React from 'react'
import { useParams } from 'react-router-dom'

// Import Components
import { NumberFormat } from '../NumberFormat'

export function InvoiceItems({ invoices }) {
  const { id } = useParams()
  const invoice = invoices.reduce((invoices, invoice) => {
    if (invoice.id == id) {
      invoices = { ...invoice }
    }
    return invoices
  }, {})
  const items = invoice.vendor_invoice_items
  const rows = []

  items.forEach(item => {
    rows.push(
      <tr key={item.id}>
        <td>{item.vendor_sku}</td>
        <td>{item.upc}</td>
        <td>{item.description}</td>
        <td>
          <NumberFormat currency value={item.cogs} />
        </td>
        <td>{item.quantity}</td>
        <td>{item.unit_of_measure}</td>
        <td>
          <NumberFormat currency value={item.cogs * item.quantity} />
        </td>
      </tr>
    )
  })

  return (
    <main id='invoice-items'>
      <section>
        <h1>Invoice #{invoice.vendor_invoice_number}</h1>
        <section>
          <h2>Vendor Details</h2>
          <p>
            <span>Vendor</span>: {invoice.vendor.name}
          </p>
          <p>
            <span>Vendor Abbr</span>: {invoice.vendor.abbreviation}
          </p>
          <p>
            <span>Customer Rep</span>: {invoice.vendor.rep_name}
          </p>
          <p>
            <span>Contact</span>: {invoice.vendor.email}
          </p>
        </section>
        <section>
          <h2>Line Item Details</h2>
          <p>
            <span>Charged Invoice Amount</span>: <NumberFormat currency value={invoice.total_amount} />
          </p>
          <p>
            <span>Calculated Invoice Amount</span>:{' '}
            <NumberFormat currency value={items.reduce((total, item) => total + item.cogs * item.quantity, 0)} />
          </p>
          <p>
            <span>Total Units on Invoice</span>:{' '}
            <NumberFormat value={items.reduce((total, item) => total + item.quantity, 0)} />
          </p>
          <table>
            <thead>
              <tr>
                <th>Vendor SKU</th>
                <th>UPC</th>
                <th>Description</th>
                <th>COGS</th>
                <th>Quantity</th>
                <th>UOM</th>
                <th>Total COGS</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </section>
      </section>
    </main>
  )
}
