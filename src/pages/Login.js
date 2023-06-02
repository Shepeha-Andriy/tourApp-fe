import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBInput, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBCardFooter } from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { googleAuth, login } from '../redux/features/authSlice'
import { GoogleLogin } from 'react-google-login'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData
  const { loading, error } = useSelector(state => ({ ...state.auth }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email && password) {
      dispatch(login({ formData, navigate, toast }))
    }
  }

  const onInputChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const googleOnSuccess = async(res) => {
    console.log(res)
    const email = res?.profileObj?.email
    const name = res?.profileObj?.name
    const token = res?.tokenId
    const googleId = res?.googleId

    const result = { email, name, token, googleId }
    
    dispatch(googleAuth({ result, navigate, toast }))
  }

  const googleOnFailure = (err) => {
    console.log(err)
    toast.error(err)
  }

  return (
    <div style={{margin: 'auto', padding: '15px', maxWidth: '450px', alignContent: 'center', marginTop: '120px'}}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x'></MDBIcon>
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-12'>
              <MDBInput label='Email' type='email' value={email} name='email' onChange={onInputChange} required>
              </MDBInput>
            </div>

            <div className='col-md-12'>
              <MDBInput label='Password' type='password' value={password} name='password' onChange={onInputChange} required>
              </MDBInput>
            </div>

            <div className='col-12'> 
              <MDBBtn style={{ width: '100%' }} className='mt-2'>
                {
                  loading && ( <MDBSpinner size='sm' tag='span' className='me-2'></MDBSpinner> )
                }
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br></br>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID}
            render={(renderProps) => (
              <MDBBtn style={{ width: '100%' }} color='danger' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <MDBIcon className='me-2' fab icon='google'></MDBIcon>
                Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleOnSuccess}
            onFailure={googleOnFailure}
            cookiePolicy="single_host_origin"
          >
          </GoogleLogin>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to={'/register'}>
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}
