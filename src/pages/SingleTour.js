import React, { useEffect } from 'react'
import {
  MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn, MDBModalContent } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTour } from '../redux/features/tourSlice';
import moment from 'moment'

export default function SingleTour() {
  const { tour, loading } = useSelector(state => ({ ...state.tour }))
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(getTour(id))
    }
  }, [id, dispatch])

  if (loading) {
    return (
      <h2 style={{marginTop: '200px'}}>Loading...</h2>
    )
  }
  
  return (
    <div style={{marginTop: '200px'}}>
      <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
          <MDBCardImage position='top' style={{ width: '100%', maxHeight: '600px' }} src={tour?.imageFile} alt={tour?.title}></MDBCardImage>
          <MDBCardBody>
            <h3>{tour?.title}</h3>
            <span>
              <p className='text-start tourName'>Created by: { tour?.name }</p>
            </span>
            <div style={{float: 'left'}}>
              {/* <span className='text-start'>
                {tour?.tags.map(item => `#${item}`)}
              </span> */}
            </div>
            <br></br>
            <MDBCardText className='text-start mt-2'>
              <MDBIcon style={{ float: 'left', margin: '5px' }} far icon='calendar-alt' size='lg'></MDBIcon>
              <small className='text-muted'>{ moment(tour?.createdAt).fromNow() }</small>
            </MDBCardText>
            <MDBCardText className='lead mb-0 text-start'>
              { tour?.descriptions }
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  )
}
