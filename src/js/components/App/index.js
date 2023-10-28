import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Import Components
import { Layout } from './Layout'
import { Home } from './Home'
import { NoMatch } from './NoMatch'
import { Invoices, InvoiceItems } from '../Invoice'
import { Vendors } from '../Vendor'
import { Orders, OrderItems } from '../Order'

export function App({ data }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='vendors' element={<Vendors vendors={data.vendors} />} />
          <Route path='vendors/:id' element={<Vendors vendors={data.vendors} />} />
          <Route path='invoices' element={<Invoices invoices={data.invoices} />} />
          <Route path='invoices/:id' element={<InvoiceItems invoices={data.invoices} />} />
          <Route path='orders' element={<Orders orders={data.orders} />} />
          <Route path='orders/:id' element={<OrderItems orders={data.orders} />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  )
}
