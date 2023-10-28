import React from 'react'
import { useLocation } from 'react-router-dom'

// Helper Functions
export function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

// Components
export function NumberFormat({ value, currency }) {
  let opt = {}

  if (currency) {
    opt = {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
  }

  return (
    <>
      {Number(value).toLocaleString('en-US', opt)}
    </>
  )
}

export function DateFormat({ value }) {
  const date = new Date(value)
  return (
    <>
      {`${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`}
    </>
  )
}