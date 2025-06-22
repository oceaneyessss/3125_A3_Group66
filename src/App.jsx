// src/App.jsx
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home'    // the code you currently have in App()
import Game from './Game'    // your Game.jsx

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}
