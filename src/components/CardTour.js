import React from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

export default function CardTour({ imageFile, descriptions, title, _id, name, likes }) {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.user?._id || user?.user?.googleId;

  const dispatch = useDispatch();

  const excerpt = str => {
    if (str.length > 45) {
      str = str.substring(0, 45) + '...'
    }

    return str
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{name}</div>
        <span className="text-start tag-card">
          <MDBBtn
            style={{ float: "right", marginRight: '10px' }}
            tag="a"
            color="none"
            onClick={!user?.user ? null : handleLike}
          >
            {!user?.user ? (
              <MDBTooltip title="Please login to like tour" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(descriptions)}
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

