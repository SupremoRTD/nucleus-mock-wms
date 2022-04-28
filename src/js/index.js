import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Import Components
import { App } from './components/app'

// Import dummy dataset
import fakeDB from './utils/fakeDB'

const root = createRoot(document.querySelector('#root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App data={fakeDB} />
    </BrowserRouter>
  </React.StrictMode>
)
