import React from 'react';
import './ZombieSword.css';

// Simple Zombie Sword component
export default function ZombieSword({ onAttack }) {
  return (
    <div className="zombie-sword">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <rect x="25" y="10" width="10" height="40" fill="#444" />
        <polygon points="30,10 35,5 25,5" fill="#7fca7a" />
        <rect x="27" y="50" width="6" height="8" fill="#b22222" />
      </svg>
      <button className="zombie-sword-attack" onClick={onAttack}>
        Attack with Zombie Sword
      </button>
    </div>
  );
}
