import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { gapi } from "gapi-script";
import { useDispatch } from 'react-redux';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import AddEditTour from './pages/AddEditTour';

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: process.env.REACT_APP_GOOGLE_ID,
    plugin_name: "chat",
  });
});

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    dispatch(setUser(user))
  }, [dispatch, user])

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/addTour' element={<AddEditTour></AddEditTour>}></Route>
          <Route path='/editTour:id' element={<AddEditTour></AddEditTour>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
