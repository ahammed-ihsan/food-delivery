
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import List from './pages/List/List'
import Order from './pages/Orders/Order'

const App = () => {

  const url = 'http://localhost:3000'

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />}></Route>
          <Route path='/list' element={<List url={url} />}></Route>
          <Route path='/orders' element={<Order url={url} />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App

