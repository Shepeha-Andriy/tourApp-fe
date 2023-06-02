import React, { useEffect } from 'react'
import {
  MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTour } from '../redux/features/tourSlice';
import moment from 'moment'
import DisqusThread from '../components/DisqusThread';
import Spinner from '../components/Spinner';

export default function SingleTour() {
  const { tour, loading } = useSelector(state => ({ ...state.tour }))
  const dispatch = useDispatch()
  const { id } = useParams()
  // const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      dispatch(getTour(id))
    }
  }, [id, dispatch])

  if (loading) {
    return (
      <Spinner></Spinner>
    )
  }
  
  return (
    <div style={{marginTop: '200px'}}>
      <MDBContainer>
        {/* <MDBBtn tag="a" color="none" style={{ float: "left", color: "#000" }} onClick={() => navigate("/")}>
            {/* <MDBIcon fas size="lg" icon="arrow-left" style={{ float: "left", height: '80px' }}/> */}
            {/* {'Back to home'} */}
        {/* </MDBBtn> */}
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
        {
          tour?.title && <DisqusThread id={id} title={tour.title} path={`/tour/${id}`}></DisqusThread>
        }
      </MDBContainer>
    </div>
  )
}
