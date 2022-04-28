// Import Data
import INVOICES from '../../../data/invoices.json'
import VENDORS from '../../../data/vendors.json'
import PURCHASE_ORDERS from '../../../data/purchase-orders.json'

// Build data objects
export default {
  invoices: INVOICES.map(invoice => {
    // Add purchase order info to invoice object
    const { po_number } = PURCHASE_ORDERS.reduce(
      (orders, order) => (order.id === invoice.purchase_order_id ? (orders = { ...order }) : orders),
      {}
    )
    // Add vendors info to invoice object
    const { name, abbreviation, po_contact_first_name, po_contact_last_name, po_contact_email } = VENDORS.reduce(
      (vendors, vendor) => (vendor.id === invoice.vendor_id ? (vendors = { ...vendor }) : vendors),
      {}
    )

    return {
      ...invoice,
      purchase_order: {
        po_number,
      },
      vendor: {
        name,
        abbreviation,
        rep_name: `${po_contact_first_name} ${po_contact_last_name}`,
        email: po_contact_email,
      },
    }
  }),
  vendors: VENDORS,
  purchaseOrders: PURCHASE_ORDERS,
}
