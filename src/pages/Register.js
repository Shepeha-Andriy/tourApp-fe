import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBInput, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBCardFooter } from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { register } from '../redux/features/authSlice'

export default function Register() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
  const { email, password, firstName, lastName, confirmPassword } = formData
  const { loading, error } = useSelector(state => ({ ...state.auth }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return toast.error('Password should match')
    }

    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formData, navigate, toast }))
    }
  }

  const onInputChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div style={{margin: 'auto', padding: '15px', maxWidth: '450px', alignContent: 'center', marginTop: '120px'}}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x'></MDBIcon>
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-6'>
              <MDBInput label='First Name' type='text' value={firstName} name='firstName' onChange={onInputChange} required></MDBInput>
            </div>

            <div className='col-md-6'>
              <MDBInput label='Last Name' type='text' value={lastName} name='lastName' onChange={onInputChange} required></MDBInput>
            </div>

            <div className='col-md-12'>
              <MDBInput label='Email' type='email' value={email} name='email' onChange={onInputChange} required></MDBInput>
            </div>

            <div className='col-md-12'>
              <MDBInput label='Password' type='password' value={password} name='password' onChange={onInputChange} required>
              </MDBInput>
            </div>

            <div className='col-md-12'>
              <MDBInput label='Confirm Password' type='password' value={confirmPassword} name='confirmPassword' onChange={onInputChange} required></MDBInput>
            </div>

            <div className='col-12'> 
              <MDBBtn style={{ width: '100%' }} className='mt-2'>
                {
                  loading && ( <MDBSpinner size='sm' tag='span' className='me-2'></MDBSpinner> )
                }
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to={'/login'}>
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}
