import React from 'react'

export function NumberFormat({ value, currency }) {
  let opt = {}

  if(currency) { 
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
