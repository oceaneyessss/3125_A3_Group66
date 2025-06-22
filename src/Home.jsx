import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlay, FaInstagram, FaEnvelope, FaLinkedin } from 'react-icons/fa'
import bg from './assets/background.png'


export default function Home() {

  const [showRules, setShowRules] = useState(false)
  const navigate = useNavigate()

  return (

    <div className="d-flex vh-100 align-items-center justify-content-center flex-column bg-dark">
      

      <div
        className="
          d-flex flex-column align-items-center justify-content-center
          rounded
        "
        style={{
          width: 800,
          height: 800,
          backgroundImage: `url(${bg})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="text-white fw-bold mb-4">Number Recall Game</h1>


        <div className="d-flex flex-column align-items-center w-100 px-4">
          <button
            className="btn btn-outline-light btn-lg w-35 mb-3"
            onClick={() => navigate('/game')}
          >
            <FaPlay className="me-2" />
            Start
          </button>

          <button
            className="btn btn-outline-light btn-lg mb-3" style={ {width:100} }
            onClick={() => setShowRules(r => !r)}
          >
            Rules
          </button>

          <button
            className="btn btn-outline-light btn-lg mb-3" style={ {width:100} }
            onClick={() => alert('Please use the Contact below for help!')}
          >
            Help
          </button>
        </div>


        {showRules && (
          <div className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-85 text-white p-4 rounded">
            <h2 className='text-white text-center'>How to Play</h2>
            <p>
              Depending on the chosen difficulity level, <br />
              sequences of numbers of varying lengths will <br />
              appear on the screen for only three seconds. <br />
              Memorize them and then type them into the input box.
            </p>
            <button
              className="btn btn-light mt-2"
              onClick={() => setShowRules(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>

      <footer className="bg-light text-dark py-3 mt-4 mx-auto"
              style={{ width: 800 }}>
        <div className="container text-center">
          <div className="mb-2">
            <a href="https://instagram.com/" className="text-dark mx-2">
              <FaInstagram size={24}/>
            </a>
            <a href="mailto:you@example.com" className="text-dark mx-2">
              <FaEnvelope size={24}/>
            </a>
            <a href="https://linkedin.com/" className="text-dark mx-2">
              <FaLinkedin size={24}/>
            </a>
          </div>
          <p className="mb-0">
            Student Name: Mengzhi Wu, Dongshi Li<br/>
            Student Number: 300263217 &amp; 300294775
          </p>
        </div>
      </footer>
    </div>


  )
}
