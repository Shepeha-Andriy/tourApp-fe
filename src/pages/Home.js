import React, { useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { getTours, setCurrentPage } from '../redux/features/tourSlice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';


export default function Home() {
  const {tours, loading, currentPage, numberOfPages} = useSelector(state => ({ ...state.tour }))
  // const {search} = useSelector(state => ({ ...state.search }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTours(currentPage))
  }, [dispatch, currentPage])

  if (loading) {
    return (
      <Spinner></Spinner>
    )
  }

  return (
    <div style={{ margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "center" }}>
      <MDBRow className='mt-5'>
        {
          tours.length === 0 && (
            <MDBTypography className='text-center mb-0' tag='h2'>
              No Tours Found
            </MDBTypography>
          )
        }

        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {
                tours && tours.map((item, i) => (
                  <CardTour key={i} { ...item }></CardTour>
                ))
              }
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {
        tours.length !== 0 && <Pagination setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} currentPage={currentPage} dispatch={dispatch}></Pagination>
      }
    </div>
  )
}
