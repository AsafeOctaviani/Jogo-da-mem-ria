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
        <div className="trophy-icon">🏆</div>

        <h1 className="complete-title">
          Parabéns!
          <span className="complete-subtitle">Você completou todas as fases!</span>
        </h1>

        <p className="complete-message">
          Você demonstrou grande conhecimento sobre sustentabilidade e meio ambiente.
          Juntos, podemos construir um mundo mais verde! 🌍
        </p>

        <div className="complete-stats">
          <div className="complete-stat">
            <span className="complete-stat-icon">⭐</span>
            <div>
              <span className="complete-stat-value">5/5</span>
              <span className="complete-stat-label">Fases Completas</span>
            </div>
          </div>
          <div className="complete-stat">
            <span className="complete-stat-icon">🎯</span>
            <div>
              <span className="complete-stat-value">{totalAttempts}</span>
              <span className="complete-stat-label">Tentativas Totais</span>
            </div>
          </div>
          <div className="complete-stat">
            <span className="complete-stat-icon">🃏</span>
            <div>
              <span className="complete-stat-value">25</span>
              <span className="complete-stat-label">Pares Encontrados</span>
            </div>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart} id="restart-game-btn">
          🔄 Jogar Novamente
        </button>
      </div>
    </div>
  )
}

export default GameComplete