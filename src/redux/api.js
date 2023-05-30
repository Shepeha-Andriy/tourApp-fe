import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
})

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }

  return req
})


export const signIn = (formData) => API.post('/auth/signin', formData)
export const signUp = (formData) => API.post('/auth/signup', formData)
export const googleAuth = (formData) => API.post('/auth/googleauth', formData)

export const createTour = (tourData) => API.post('/tour/create', tourData)
export const getTours = () => API.get('/tour/getall')
export const getTour = (id) => API.get(`/tour/gettour/${id}`)
export const getToursByUser = () => API.get(`/tour/userTours`)
export const updateTour = (updatedTourData, id) => API.patch(`/tour/update/${id}`, updatedTourData)
export const deleteTour = (id) => API.delete(`/tour/delete/${id}`)
