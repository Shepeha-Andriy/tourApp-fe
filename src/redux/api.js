import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export const signIn = (formData) => API.post('/auth/signin', formData)
export const signUp = (formData) => API.post('/auth/signup', formData)