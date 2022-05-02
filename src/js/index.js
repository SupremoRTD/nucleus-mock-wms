import React from 'react'
import { useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'

// Import Components
import { App } from './components/App'

// Import dummy dataset
import fakeDB from './fakeDB'

// wrapper around App to make links scroll to top (React Router doesn't do this)
function ScrollToTop({ children }) {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

const root = createRoot(document.querySelector('#root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <App data={fakeDB} />
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
)
