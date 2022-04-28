import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Currency } from '../utils/currency'

export function Invoices({ invoices }) {
  const rows = []

  invoices.forEach(invoice => {
    // Generate invoice detail rows
    rows.push(
      <tr key={invoice.id}>
        <td>{invoice.id}</td>
        <td>{invoice.vendor.name}</td>
        <td>{invoice.vendor_invoice_number}</td>
        <td>{invoice.purchase_order.po_number}</td>
        <td>
          <Currency value={invoice.total_amount} />
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
          <Currency value={item.cogs} />
        </td>
        <td>{item.quantity}</td>
        <td>{item.unit_of_measure}</td>
        <td>
          <Currency value={item.cogs * item.quantity} />
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
            <span>Charged Invoice Amount</span>: <Currency value={invoice.total_amount} />
          </p>
          <p>
            <span>Calculated Invoice Amount</span>:{' '}
            <Currency value={items.reduce((total, item) => total + item.cogs * item.quantity, 0)} />
          </p>
          <p>
            <span>Total Units on Invoice</span>:{' '}
            {Number(items.reduce((total, item) => total + item.quantity, 0)).toLocaleString('en-US')}
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
