import { useEffect, useState } from 'react'
import './GameComplete.css'

function GameComplete({ totalAttempts, onRestart }) {
  const [confettiPieces, setConfettiPieces] = useState([])

  useEffect(() => {
    
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      size: 6 + Math.random() * 8,
      color: ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b', '#a78bfa'][
        Math.floor(Math.random() * 6)
      ],
    }))
    setConfettiPieces(pieces)
  }, [])

  return (
    <div className="game-complete-screen">
<div className="confetti-container">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
            }}
          />
        ))}
      </div>

      <div className="game-complete-content">
        <div className="trophy-icon">
          <svg viewBox="0 0 80 80" fill="none">
            <defs>
              <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="trophyShine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            {/* Base */}
            <rect x="28" y="62" width="24" height="6" rx="3" fill="url(#trophyGrad)" />
            {/* Stem */}
            <rect x="36" y="52" width="8" height="14" rx="2" fill="url(#trophyGrad)" />
            {/* Cup */}
            <path d="M20 14h40v8c0 16-8 28-20 32-12-4-20-16-20-32v-8z" fill="url(#trophyGrad)" />
            {/* Shine */}
            <path d="M24 16h14v6c0 12-4 20-10 24-4-3-6-10-6-20v-10z" fill="url(#trophyShine)" opacity="0.5" />
            {/* Handles */}
            <path d="M20 18c-6 0-10 4-10 10s4 10 8 10c2 0 3-1 4-2" stroke="url(#trophyGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M60 18c6 0 10 4 10 10s-4 10-8 10c-2 0-3-1-4-2" stroke="url(#trophyGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Star */}
            <path d="M40 24l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z" fill="#fff" opacity="0.6" />
          </svg>
        </div>

        <h1 className="complete-title">
          Parabéns!
          <span className="complete-subtitle">Você completou todas as fases!</span>
        </h1>

        <p className="complete-message">
          Você demonstrou grande conhecimento sobre sustentabilidade e meio ambiente.
          Juntos, podemos construir um mundo mais verde!
        </p>

        <div className="complete-stats">
          <div className="complete-stat">
            <span className="complete-stat-icon"><svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>
            <div>
              <span className="complete-stat-value">5/5</span>
              <span className="complete-stat-label">Fases Completas</span>
            </div>
          </div>
          <div className="complete-stat">
            <span className="complete-stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
            <div>
              <span className="complete-stat-value">{totalAttempts}</span>
              <span className="complete-stat-label">Tentativas Totais</span>
            </div>
          </div>
          <div className="complete-stat">
            <span className="complete-stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8"/><path d="M12 8v8"/></svg></span>
            <div>
              <span className="complete-stat-value">25</span>
              <span className="complete-stat-label">Pares Encontrados</span>
            </div>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart} id="restart-game-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18" style={{marginRight: '8px'}}><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Jogar Novamente
        </button>
      </div>
    </div>
  )
}

export default GameComplete