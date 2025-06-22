import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home'    
import Game from './Game'    
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}
