import React, { useState } from 'react'
import { MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBCollapse, MDBNavbarBrand, MDBDropdown } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../redux/features/authSlice'

export default function Header() {
  const [show, setShow] = useState(true)
  const { user } = useSelector(state => (state.auth))
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(setLogout())
  }

  return (
    <MDBNavbar fixed='top' expand='lg' style={{backgroundColor: '#f0e6ea'}}>
      <MDBContainer>
        <MDBNavbarBrand href='/' style={{color: '#606080', fontWeight: '600', fontSize: '22px'}}>
          Tourpedia
        </MDBNavbarBrand>
        {/* <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler> */}
        {/* <MDBCollapse show={show}> */}
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            {user?.user?._id && (
              <MDBNavbarItem>
                {/* <MDBNavbarLink> */}
                  <p>Logged in as: {user?.user?.name}</p>
                {/* </MDBNavbarLink> */}
              </MDBNavbarItem>
            )}  
          
          <MDBNavbarItem>
              <MDBNavbarLink href='/'>
                <p className='header-text'>Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

          {
            user?.user?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/addTour'>
                    <p className='header-text'>Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBNavbarLink href='/dashboard'>
                    <p className='header-text'>Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )
          }

          {
            user?.user?._id
            ? (<MDBNavbarItem>
              <MDBNavbarLink href='/login'>
                <p className='header-text' onClick={handleLogout}>Logout</p>
              </MDBNavbarLink>
              </MDBNavbarItem>)
              : (<MDBNavbarItem>
              <MDBNavbarLink href='/login'>
                <p className='header-text'>Login</p>
              </MDBNavbarLink>
            </MDBNavbarItem>)
          }
          </MDBNavbarNav>
        {/* </MDBCollapse> */}
      </MDBContainer>
    </MDBNavbar>
  )
}
