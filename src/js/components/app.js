import * as React from 'react'
import { Routes, Route, Link, NavLink, Outlet } from 'react-router-dom'

// Import Components
import { Invoices, InvoiceItems } from './invoice'

// Default page layout
function Layout() {
  return (
    <>
      <header>
        <img src='../images/logo.png' />
        <h1>Nucleus</h1>
        <nav>
          <ul>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} to='/'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? 'active' : undefined)} to='/invoices'>
                Invoices
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer></footer>
    </>
  )
}

// Home route when no other route is selected
function Home() {
  return (
    <main id='home'>
      <section>
        <h1>
          Welcome to <span>Nucleus</span>, the Amazon FBA WMS
        </h1>
      </section>
    </main>
  )
}

// "404" Route
function NoMatch() {
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

export function App({ data }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='invoices' element={<Invoices invoices={data.invoices} />} />
          <Route path='invoices/:id' element={<InvoiceItems invoices={data.invoices} />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  )
}
