import React from 'react'
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

export default function PrivateRoute({ children }) {
  const {user} = useSelector(state => ({ ...state.auth }))

  return user ? children : <LoadingToRedirect></LoadingToRedirect> 
}
