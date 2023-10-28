import React from 'react'
import { useParams } from 'react-router-dom'

// Custom Imports
import { NoMatch } from '../App/NoMatch'
import { NumberFormat, DateFormat } from '../utils'

export function OrderItems({ orders }) {
  const { id } = useParams()
  const order = orders.reduce((orders, order) => {
    if (order.id == id) {
      order.available_products = order.order_details.filter(item => (item.order_each + item.order_case) !== 0)
      order.unavailable_products = order.order_details.filter(item => (item.order_each + item.order_case) === 0)
      orders = { ...order }
    }
    return orders
  }, {})

  // Return error if the order is empty
  if(!Object.keys(order).length) return <NoMatch />


  const available_products = []
  const unavailable_products = []

  const table = (title, row) => {
    return (
      <section>
        <h2>{title}</h2>
        <table>
          <thead>
            <tr>
              <th>Vendor SKU</th>
              <th>UPC</th>
              <th>Description</th>
              <th>MSRP</th>
              <th>COGS</th>
              <th>Units(ea)</th>
              <th>Units(case)</th>
              <th>Units Per Case</th>
              <th>Total COGS</th>
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      </section>
    )
  }

  const row = (item) => {
    return (
      <tr key={item.id}>
        <td>{item.vendor_sku}</td>
        <td>{item.sku.upc}</td>
        <td style={{wordWrap: "word-break", width: "35%" }}>{item.vendor_description}</td>
        <td>
          <NumberFormat currency value={item.msrp_each} />
        </td>
        <td>
          <NumberFormat currency value={item.cogs_each} />
        </td>
        <td>{item.order_each}</td>
        <td>{item.order_case}</td>
        <td>{item.units_per_case}</td>
        <td>
          <NumberFormat currency value={
            item.order_each !== 0 ? 
            item.cogs_each * item.order_each :
            item.cogs_each * (item.order_case * item.units_per_case)
          } />
        </td>
      </tr>
    )
  }

  order.available_products.forEach(item => {
    available_products.push(row(item))
  })

  order.unavailable_products.forEach(item => {
    unavailable_products.push(row(item))
  })

  return (
    <main id='order-items'>
      <section>
        <h1>Order #{order.id}</h1>
        <section>
          <h2>Order Details</h2>
          <p>
            <span>Order Name</span>: {order.name}
          </p>
          <p>
            <span>Created At</span>: <DateFormat value={order.created_at} />
          </p>
          <p>
            <span>Updated At</span>: <DateFormat value={order.updated_at} />
          </p>
          <p>
            <span>Conversion Rate</span>: <DateFormat value={order.conversion_rate} />
          </p>
          <p>
            <span>PO#</span>: {order.order_details[0].purchase_order_id}
          </p>
          <h3>Shipped From</h3>
          <p>{order.order_details[0].client.name}</p>
          <p>{order.order_details[0].client.ship_from_address_line_1}</p>
          <p>{order.order_details[0].client.ship_from_address_line_2}</p>
          <p>
            {`${order.order_details[0].client.ship_from_city}, `}
            {order.order_details[0].client.ship_from_state} {order.order_details[0].client.ship_from_zipcode}
          </p>
          <p>{order.order_details[0].client.ship_from_country}</p>
        </section>
        {available_products.length > 0 &&
          table('Available Products', available_products)
        }
        {unavailable_products.length > 0 &&
          table('Unavailable Products', unavailable_products)
        }
      </section>
    </main>
  )
}
