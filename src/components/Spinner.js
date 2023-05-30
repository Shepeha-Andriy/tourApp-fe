import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'

export default function Spinner() {
  return (
    <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem', marginTop: '100px', position: 'absolute', left: '50%' }}>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
  )
}
