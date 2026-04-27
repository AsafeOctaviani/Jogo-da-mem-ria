import { useEffect, useState } from 'react'
import './PhaseComplete.css'

function PhaseComplete({ success, phaseNumber, attempts, elapsedTime, totalPairs, onNext, onRetry, onBackToMenu }) {
  const [confettiPieces, setConfettiPieces] = useState([])

  useEffect(() => {
    if (!success) return
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2.5,
      size: 4 + Math.random() * 6,
      color: ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b'][Math.floor(Math.random() * 5)],
    }))
    setConfettiPieces(pieces)
  }, [success])
  const formatTime = (seconds) => {
    if (!seconds) return '—'
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="phase-modal-overlay">
      {success && confettiPieces.length > 0 && (
        <div className="phase-confetti-container">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="phase-confetti-piece"
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
      )}
      <div className={`phase-modal ${success ? 'success' : 'fail'}`}>
        {success ? (
          <>
            <div className="modal-icon success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="modal-title">Fase {phaseNumber} Completa!</h2>
            <p className="modal-subtitle">Parabéns! Você encontrou todos os pares!</p>
<div className="modal-stats">
              <div className="modal-stat">
                <span className="modal-stat-value">{attempts}</span>
                <span className="modal-stat-label">Tentativas</span>
              </div>
              <div className="modal-stat">
                <span className="modal-stat-value">{totalPairs}</span>
                <span className="modal-stat-label">Pares</span>
              </div>
              <div className="modal-stat">
                <span className="modal-stat-value">{formatTime(elapsedTime)}</span>
                <span className="modal-stat-label">Tempo</span>
              </div>
            </div>
            <button className="modal-button success-button" onClick={onNext} id="next-phase-btn">
              {phaseNumber < 5 ? 'Próxima Fase →' : 'Ver Resultado Final'}
            </button>
          </>
        ) : (
          <>
            <div className="modal-icon fail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="modal-title">Tempo Esgotado!</h2>
<p className="modal-subtitle">
              O tempo acabou na Fase {phaseNumber}.
              <br /><span className="modal-tip">Dica: observe os ícones nos cards para distinguir imagens de descrições.</span>
            </p>
            <button className="modal-button retry-button" onClick={onRetry} id="retry-phase-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16" style={{marginRight: '6px', verticalAlign: 'middle'}}><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              Recomeçar Fase
            </button>
          </>
        )}
<button className="modal-link-btn" onClick={onBackToMenu} id="phase-back-menu-btn">
          ← Voltar ao menu principal
        </button>
      </div>
    </div>
  )
}

export default PhaseComplete