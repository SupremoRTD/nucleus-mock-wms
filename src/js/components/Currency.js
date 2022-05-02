import React from 'react'

export function Currency({ value }) {
  return (
    <>
      {Number(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })}
    </>
  )
}
