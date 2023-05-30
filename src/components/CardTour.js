import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';

export default function CardTour({ imageFile, descriptions, title, _id, name }) {

  const excerpt = str => {
    if (str.length > 45) {
      str = str.substring(0, 45) + '...'
    }

    return str
  }

  return (
    <MDBCardGroup>
      <MDBCard className='h-100 mt-3 d-sm-flex' style={{maxWidth: '20rem'}}>
        <MDBCardImage src={imageFile} alt={title} position='top' style={{ maxWidth: "100%", height: "180px" }}></MDBCardImage>
        <div className='top-left'>{name}</div>
        <MDBCardBody>
          <MDBCardTitle className='text-start'>{ title }</MDBCardTitle>
          <MDBCardText className='text-start'>{excerpt(descriptions)}
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  )
}
