
import './App.css'

import SignPage from './views/signpage/Signpage'
import Dashboard from './views/dashboard/Dashboard'

import { Routes, Route } from 'react-router'


function App() {

  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<SignPage />}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
