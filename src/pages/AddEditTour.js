import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBValidation, MDBBtn } from "mdb-react-ui-kit";
// import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTour, updateTour } from '../redux/features/tourSlice';

export default function AddEditTour() {
  const [tourData, setTourData] = useState({ title: '', descriptions: '', imageFile: '' })
  const { title, descriptions } = tourData
  const {error, userTours} = useSelector(state => ({ ...state.tour }))
  const { user } = useSelector(state => ({ ...state.auth }))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [titleErrMsg, setTitleErrMsg] = useState(null);
  const [desErrMsg, setDesErrMsg] = useState(null);

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find(tour => tour._id === id)
      setTourData({...singleTour})
    }
  }, [id, userTours])

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const onInputChange = (e) => {
    let { name, value } = e.target
    setTourData({ ...tourData, [name]: value })
  }

  const handleClear = (e) => {
    setTourData({
      title: '',
      descriptions: '',
      tags: [],
      imageFile: ''
    })
    setDesErrMsg(null)
    setTitleErrMsg(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title && !descriptions) {
      setTitleErrMsg("Please provide title");
      setDesErrMsg("Please provide descriptions");
    }

    if (!title) {
      setTitleErrMsg("Please provide title");
    }

    if (!descriptions) {
      setDesErrMsg("Please provide descriptions");
    }

    if (title && descriptions) {
      const updaterTourData = { ...tourData, name: user?.user?.name }
      
      if (!id) {
        dispatch(createTour({ updaterTourData, navigate, toast }))
      } else {
        dispatch(updateTour({id, updaterTourData, toast, navigate}))
      }

      handleClear()
    }
  }

  // const handleAddTag = (tag) => {
  //   setTourData({ ...tourData, tags: [...tourData.tags, tag] })
  // }
  
  // const handleDelTag = (deletTag) => {
  //   setTourData({ ...tourData, tags: tourData.tags.filter(tag => tag !== deletTag) })
  // }

  return (
    <div style={{margin: 'auto', padding: '15px', maxWidth: '450px', alignContent: 'center', marginTop: '120px'}} className='container'>
      <MDBCard alignment='center'>
        <h5>{ id ? 'Update Tour' : 'Add Tour' }</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
            <div className='col-md-12'>
              <input placeholder='Enter Title' type='text' value={title} name='title' className='form-control' required onChange={onInputChange}></input>
              {titleErrMsg && <div className="tagErrMsg">{titleErrMsg}</div>}
            </div>

            <div className='col-md-12 mt-2'>
              <textarea placeholder='Enter Descriptions' type='text' value={descriptions} name='descriptions' className='form-control' required onChange={onInputChange}></textarea>
              {desErrMsg && <div className="tagErrMsg">{desErrMsg}</div>}
            </div>

            {/* <div className='col-md-12 mt-4'>
              <ChipInput name='tags' variant='outlined' placeholder='Enter Tag' value={tags} onAdd={(tag) => handleAddTag(tag)} onDelete={(tag) => handleDelTag(tag)}></ChipInput>
            </div> */}

            <div className='d-flex justify-contnt-start mt-4'>
              <FileBase type='file' multiple={false} onDone={({ base64 }) => setTourData({  ...tourData, imageFile: base64 })}></FileBase>
            </div>

            <div className='col-12 mt-2'>
              <MDBBtn style={{ width: '100%' }}>{ id ? 'Update' : 'Add' }</MDBBtn>
              <MDBBtn style={{width: '100%'}} className='mt-2' color='danger' onClick={handleClear}>Clear</MDBBtn>
            </div>

          </MDBValidation>

          {/* <div style={{maxHeight: '300px', maxWidth: '300px'}}>
            {
              imageFile && (
                <img src={imageFile.base64} alt="img"></img>
              )
            }
          </div> */}
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}
