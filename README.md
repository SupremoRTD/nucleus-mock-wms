# Nucleus Mock Site

## Warehouse Management System for Amazon FBA

This WMS help manage inventory ordered specifically for Amazon FBA, stored within a physical warehouse and then shipped to Amazon's fulfillment centers.

## Note:

This is a mock website, not intended for commerical use in any way.

- All data pulls from locally stored JSON files
- All "backend" calls are actually just functions that manipulate the stored JSON, this is for simplicity on my end
- Nothing is saved, a fresh will reset any manipulated data

## Main Feature Overview

1. Connect order data to invoice data
2. Create FBA shipment upload file from an invoice
3. Quick receive and ship inventory
4. Receive, bin, and create shipments from inventory in the future

## Completion Progress

**1. Connect order data to invoice data**

- Vendors component
    - Displays vendor information
    - Links to invoices associated with a vendor

- Invoices component
    - Displays invoice information
    - Links to vendor associated with an invoice
    - Links to invoice items component

- Invoice Items component
    - Displays invoice information for a specific invoice

- Orders component
    - Displays top level summary for all orders
    - Links to order details

- Order Details component
    - Displays detailed information for a specifed order