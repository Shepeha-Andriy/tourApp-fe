import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { gapi } from "gapi-script";

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: process.env.REACT_APP_GOOGLE_ID,
    plugin_name: "chat",
  });
});

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
