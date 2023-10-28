import React from 'react'
import { Link } from 'react-router-dom'

// Custom Imports
import { OrderItems } from './orderItems'
import { DateFormat } from '../utils'

function Orders({ orders }) {
  const rows = []

  orders.forEach(order => {
    // Generate invoice detail rows
    rows.push(
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.name}</td>
        <td>{<DateFormat value={order.created_at} />}</td>
        <td>{<DateFormat value={order.updated_at} />}</td>
        <td>{order.conversion_rate}</td>
        <td>
          <Link to={`/orders/${order.id}`}>
            <button>Order Details</button>
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <main id='orders'>
      <section>
        <h1>Orders</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Conversion Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </section>
    </main>
  )
}

export { Orders, OrderItems }
