import React from 'react'
import { Link } from 'react-router-dom'

// Custom Imports
import { NumberFormat, useQuery } from '../utils'
import { InvoiceItems } from './InvoiceItems'

function Invoices({ invoices }) {
  const rows = []

  invoices.forEach(invoice => {
    // Filter results if there's a query param
    const vendor = useQuery().get('vendor')

    if (vendor) {
      if (invoice.vendor.id != vendor) {
        return
      }
    }

    // Generate invoice detail rows
    rows.push(
      <tr key={invoice.id}>
        <td>{invoice.id}</td>
        <td>
          <Link to={`/vendors/${invoice.vendor.id}`}>
            {invoice.vendor.name}
          </Link>
        </td>
        <td>{invoice.vendor_invoice_number}</td>
        <td>{invoice.purchase_order.po_number}</td>
        <td>
          <NumberFormat currency value={invoice.total_amount} />
        </td>
        <td>{invoice.status}</td>
        <td>
          <Link to={`/invoices/${invoice.id}`}>
            <button>Invoice Items</button>
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <main id='invoices'>
      <section>
        <h1>Invoices</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendor</th>
              <th>Invoice #</th>
              <th>Purchase Order #</th>
              <th>Invoice Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </section>
    </main>
  )
}

export { Invoices, InvoiceItems }
