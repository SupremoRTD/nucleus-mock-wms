// Import Data
import INVOICES from '../../data/invoices.json'
import VENDORS from '../../data/vendors.json'
import PURCHASE_ORDERS from '../../data/purchase-orders.json'
import ORDERS from '../../data/orders.json'

// Build data objects
export default {
  invoices: INVOICES.map(invoice => {
    // Add purchase order info to invoice object
    const { po_number: purchase_order_po_number } = PURCHASE_ORDERS.reduce(
      (orders, order) => (order.id === invoice.purchase_order_id ? (orders = { ...order }) : orders),
      {}
    )

    // Add vendors info to invoice object
    const {
      id: vendor_id,
      name: vendor_name,
      abbreviation: vendor_abbr,
      po_contact_first_name: vendor_po_contact_first_name,
      po_contact_last_name: vendor_po_contact_last_name,
      po_contact_email: vendor_po_contact_email,
    } = VENDORS.reduce(
      (vendors, vendor) => (vendor.id === invoice.vendor_id ? (vendors = { ...vendor }) : vendors),
      {}
    )

    // Add orders info to invoice object
    const { order_details: [{ client }] } = ORDERS.reduce(
      (orders, order) => (order.order_details[0].purchase_order_id === invoice.purchase_order_id ? (orders = { ...order }) : orders),
      {}
    )

    return {
      ...invoice,
      purchase_order: {
        po_number: purchase_order_po_number,
      },
      vendor: {
        id: vendor_id,
        name: vendor_name,
        abbreviation: vendor_abbr,
        rep_name: `${vendor_po_contact_first_name} ${vendor_po_contact_last_name}`,
        email: vendor_po_contact_email,
        ship_address_line_1: client.ship_from_address_line_1,
        ship_address_line_2: client.ship_from_address_line_2,
        ship_address_city: client.ship_from_city,
        ship_address_state: client.ship_from_state,
        ship_address_zipcode: client.ship_from_zipcode,
        ship_address_country: client.ship_from_country
      },
    }
  }),
  vendors: VENDORS,
  purchaseOrders: PURCHASE_ORDERS,
  orders: ORDERS
}
