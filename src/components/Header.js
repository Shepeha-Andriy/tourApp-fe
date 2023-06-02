import React, { useEffect, useState } from 'react'
import { MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarBrand } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../redux/features/authSlice'
import { getToursBySearch } from '../redux/features/tourSlice'
import { useNavigate } from 'react-router-dom'
import { setSearch2 } from '../redux/features/searchSlice'
import decode from 'jwt-decode'

export default function Header() {
  // const [show, setShow] = useState(true)
  const [search, setSearch] = useState('')
  const { user } = useSelector(state => (state.auth))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = user?.token

  if (token) {
    const decodedToken = decode(token)

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout())
    }
  }

  const handleLogout = async () => {
    dispatch(setLogout())
  }

  useEffect(() => {
    dispatch(setSearch2(search))
  }, [search, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (search) {
      dispatch(getToursBySearch(search))
      navigate(`/tours/search?searchQuery=${search}`)
      setSearch('')
    } else {
      navigate('/')
    }
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
                  <h5 style={{marginRight: '30px', marginTop: '12px'}}>Logged in as: {user?.user?.name}</h5>
                {/* </MDBNavbarLink> */}
              </MDBNavbarItem>
          )}  
          
          <form className='d-flex input-group w-auto' onSubmit={handleSubmit} style={{marginTop: '5px', marginLeft: '5px'}}>
            <input type='text' className='form-control' placeholder='Search Tour' value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <div style={{marginTop: '5px', marginLeft: '5px'}}>
              <MDBIcon fas icon='search'></MDBIcon>
            </div>
          </form>
          
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
        {/* <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
          <input type='text' className='form-control' placeholder='Search Tour' value={search} onChange={(e) => setSearch(e.target.value)}></input>
          <div style={{marginTop: '5px', marginLeft: '5px'}}>
            <MDBIcon fas icon='search'></MDBIcon>
          </div>
        </form> */}
        {/* </MDBCollapse> */}
      </MDBContainer>
    </MDBNavbar>
  )
}
