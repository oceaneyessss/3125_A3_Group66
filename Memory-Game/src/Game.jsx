// src/Game.jsx
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import bg from './assets/background.png'

export default function Game() {
  // Set Game Config:
  const levelsConfig = {
    easy:   { length: 4, displayMs: 3000, rounds: 5 },
    medium: { length: 6, displayMs: 2000, rounds: 7 },
    hard:   { length: 8, displayMs: 1000, rounds: 10 },
  }
  const CHARSET =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    '0123456789' +
    '!@#$%^&*'

  // ——— Local state ———
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [round, setRound] = useState(1)
  const [seq, setSeq] = useState('')
  const [showing, setShowing] = useState(true)
  const [guess, setGuess] = useState('')
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Grab the config for the chosen level
  const cfg = selectedLevel ? levelsConfig[selectedLevel] : null

  // Generate a random string with given length for player to memory
  function genString(len) {
    let s = ''
    for (let i = 0; i < len; i++) {
      s += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length))
    }
    return s
  }

  // On each round (and level change), show → hide the sequence
  useEffect(() => {
    if (!selectedLevel) return
    if (round > cfg.rounds) {
      setFinished(true)
      return
    }

    const newSeq = genString(cfg.length)
    setSeq(newSeq)
    setShowing(true)
    setGuess('')
    const totalSeconds = Math.ceil(cfg.displayMs / 1000)
    setCountdown(totalSeconds)
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(interval)
          return 0
        }
        return c - 1
      })
    }, 1000)

    const timeout = setTimeout(() => {
      setShowing(false)
    }, cfg.displayMs)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [round, selectedLevel])

  // When user submits their guess
  function handleSubmit(e) {
    e.preventDefault()
    if (guess === seq) {
      setScore(s => s + 1)
    }
    setRound(r => r + 1)
  }


  // Reset everything back to the level‐select screen
  function resetGame() {
    setSelectedLevel(null)
    setRound(1)
    setSeq('')
    setShowing(true)
    setGuess('')
    setScore(0)
    setFinished(false)
    setCountdown(0)
  }

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center flex-column bg-dark">
      <div
        className="d-flex flex-column align-items-center justify-content-center rounded"
        style={{
          width: 800,
          height: 800,
          backgroundImage: `url(${bg})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        {!selectedLevel && (
          <div
            className="d-flex flex-column align-items-center justify-content-center
                       position-absolute top-50 start-50 translate-middle
                       bg-dark bg-opacity-75 text-white p-4 rounded"
            style={{ width: 400, height: 500 }}
          >
            <button
              className="btn btn-outline-light btn-lg mb-5 text-success fw-bold"
              style={{ width: 350, fontFamily: 'Georgia' }}
              onClick={() => setSelectedLevel('easy')}
            >
              LEVEL 1 (Easy)
            </button>
            <button
              className="btn btn-outline-light btn-lg mb-5 text-warning fw-bold"
              style={{ width: 350, fontFamily: 'Georgia' }}
              onClick={() => setSelectedLevel('medium')}
            >
              LEVEL 2 (Medium)
            </button>
            <button
              className="btn btn-outline-light btn-lg mb-5 text-danger fw-bold"
              style={{ width: 350, fontFamily: 'Georgia' }}
              onClick={() => setSelectedLevel('hard')}
            >
              LEVEL 3 (Hard)
            </button>
          </div>
        )}

        {selectedLevel && !finished && (
          <div
            className="position-absolute top-50 start-50 translate-middle
                       bg-dark bg-opacity-75 text-white p-4 rounded"
            style={{ width: 400 }}
          >
            <h4 className="text-center mb-3">
              {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} — Round {round}/{cfg.rounds}
            </h4>
             <div className="mb-3 text-center">
              {showing ? (
                <>
                  <div className="mt-2 text-danger fw-bold mb-3">
                    Time left: <strong>{countdown}</strong>s
                  </div>
                  <span className="fs-3 bg-light text-dark p-2 rounded">{seq}</span>
                  
                </>
              ) : (
                <span className="fs-5">Type the sequence below:</span>
              )}
            </div>

            {!showing && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-3 text-white bg-dark fw-bold"
                  value={guess}
                  onChange={e => setGuess(e.target.value)}
                  placeholder="Enter sequence..."
                  autoFocus
                />
                <button type="submit" className="btn btn-secondary w-100 text-white fw-bold">
                  Confirm
                </button>
              </form>
            )}
          </div>
        )}

        {selectedLevel && finished && (
          <div
            className="position-absolute top-50 start-50 translate-middle
                       bg-dark bg-opacity-75 text-white p-4 rounded"
            style={{ width: 400 }}
          >
            <h4 className="text-center mb-3">Game Over</h4>
            <p className="text-center mb-1">
              Score: {score} / {cfg.rounds}
            </p>
            <p className="text-center mb-3">
              Your Accuracy: {((score/cfg.rounds)*100).toFixed(1)}%
            </p>
            <button
              className="btn btn-outline-light w-100"
              onClick={resetGame}
            >
              Back to menu
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
