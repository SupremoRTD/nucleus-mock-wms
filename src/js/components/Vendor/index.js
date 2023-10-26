import React from 'react'
import { Link, useParams } from 'react-router-dom'

// Custom Imports
import { NoMatch } from '../App/NoMatch'

function Vendors({ vendors }) {
  const { id } = useParams()
  const rows = []

  if(id) {
    vendors = vendors.filter(vendor => vendor.id == id)
  }

  // Return error if vendors are empty
  if(vendors.length === 0) return <NoMatch />

  vendors.forEach(vendor => {
    // Generate invoice detail rows
    rows.push(
      <tr key={vendor.id}>
        <td>{vendor.id}</td>
        <td>{vendor.name}</td>
        <td>{vendor.abbreviation}</td>
        <td>
          {vendor.address_city ?
            <>
              <div>{vendor.address_line_1}</div>
              <div>{vendor.address_line_2}</div>
              <div>{vendor.address_city}, {vendor.address_state} {vendor.address_zipcode}</div>
              <div>{vendor.address_country}</div>
            </>
            : ''
          }
        </td>
        <td>
          {vendor.po_contact_first_name ?
            <>
              <div>{vendor.po_contact_first_name} {vendor.po_contact_last_name}</div>
              <div>{vendor.po_contact_email}</div>
              <div style={{ display: vendor.po_contact_phone1 === '' ? 'none' : '' }}>
                {vendor.po_contact_phone1_type}: {vendor.po_contact_phone1}
              </div>
              <div style={{ display: vendor.po_contact_phone2 === '' ? 'none' : '' }}>
                {vendor.po_contact_phone2_type}: {vendor.po_contact_phone2}
              </div>
            </>
            : ''
          }
        </td>
        <td>
          <i
            className='fa-solid fa-circle'
            style={{
              color: vendor.status === 'active' ? '#04e600' : '#ff0000',
              width: '100%',
              textAlign: 'center',
            }} />
        </td>
        <td>
          <Link to={`/invoices?vendor=${vendor.id}`}>
            <button>Invoices</button>
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <main id='vendors'>
      <section>
        <h1>Vendors</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Abbr.</th>
              <th>Address</th>
              <th>Contact</th>
              <th style={{ textAlign: 'center' }}>Active Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </section>
    </main>
  )
}

export { Vendors }
