import React from 'react'
import { Link } from 'react-router-dom'

// "404" Route
export function NoMatch() {
  return (
    <main id='404'>
      <section>
        <h1>404... Location not found</h1>
        <p>
          <Link to='/'>Go to the home page</Link>
        </p>
      </section>
    </main>
  )
}
