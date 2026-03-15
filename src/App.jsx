import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Floor from './Floor.jsx'
import './App.css'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
        <h2>Zombie Controls</h2>
        <p>
          Use the buttons below to move and turn the zombie:<br />
          <b>Forward</b>: W &nbsp; <b>Backward</b>: S &nbsp; <b>Turn Left</b>: A &nbsp; <b>Turn Right</b>: D<br />
          Or use the mouse to rotate the camera.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button id="move-forward">W</button>
          <button id="move-backward">S</button>
          <button id="turn-left">A</button>
          <button id="turn-right">D</button>
        </div>
      </div>
      <Floor />
    </div>
  );
}


export default App
