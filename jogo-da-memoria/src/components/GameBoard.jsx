import { useState, useEffect, useCallback, useRef } from 'react'
import Card from './Card'
import QuestionPanel from './QuestionPanel'
import ToastContainer, { useToast } from './Toast'
import ConfirmModal from './ConfirmModal'
import { PHASE_TIME_LIMITS } from '../data/phases'
import gameBg from '../assets/game-bg.png'
import AudioPlayer from './AudioPlayer'
import './GameBoard.css'

function GameBoard({ phase, onPhaseComplete, onPhaseFail, onBackToMenu, onRestartPhase, currentPhaseIndex }) {
  const timeLimit = PHASE_TIME_LIMITS[currentPhaseIndex] || 180
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(new Set())
  const [attempts, setAttempts] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [shakeCards, setShakeCards] = useState(new Set())
  const [remainingTime, setRemainingTime] = useState(0)
  const [showConfirm, setShowConfirm] = useState(null) 
  const timerRef = useRef(null)
  const gameOverRef = useRef(false)
  const { toasts, showToast } = useToast()

  useEffect(() => {
    setCards([...phase.cards])
    setFlippedCards([])
    setMatchedPairs(new Set())
    setAttempts(0)
    setIsChecking(false)
    setShakeCards(new Set())
    setRemainingTime(timeLimit)
    gameOverRef.current = false
  }, [phase, timeLimit])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          if (!gameOverRef.current) {
            gameOverRef.current = true
            setTimeout(() => onPhaseFail(), 300)
          }
          return 0
        }
        if (prev === 61) showToast('1 minuto restante!', 'warning', 3000)
        if (prev === 31) showToast('30 segundos!', 'error', 3000)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase, onPhaseFail, showToast])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const elapsedTime = timeLimit - remainingTime

  const handleCardClick = useCallback((index) => {
    if (isChecking) return
    if (flippedCards.length >= 2) return
    if (remainingTime <= 0) return
    if (flippedCards.includes(index)) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      const [first, second] = newFlipped
      const card1 = cards[first]
      const card2 = cards[second]

      if (card1.type === card2.type) {
        showToast('Combine uma descrição com uma imagem!', 'warning', 2500)
      }

      if (card1.pairId === card2.pairId && card1.type !== card2.type) {
        
        showToast('Par encontrado!', 'success')
        setTimeout(() => {
          setMatchedPairs((prev) => {
            const next = new Set(prev)
            next.add(card1.pairId)

            if (next.size === phase.pairs) {
              clearInterval(timerRef.current)
              gameOverRef.current = true
              setTimeout(() => onPhaseComplete(newAttempts, timeLimit - remainingTime), 600)
            }
            return next
          })
          setFlippedCards([])
          setIsChecking(false)
        }, 600)
      } else {
        setTimeout(() => {
          setShakeCards(new Set([first, second]))
          setTimeout(() => {
            setShakeCards(new Set())
            setFlippedCards([])
            setIsChecking(false)
          }, 500)
        }, 800)
      }
    }
  }, [isChecking, flippedCards, attempts, cards, phase, onPhaseComplete, showToast, remainingTime, timeLimit])

  const handleMenuClick = () => setShowConfirm('menu')
  const handleRestartClick = () => setShowConfirm('restart')

  const handleConfirm = () => {
    if (showConfirm === 'menu') {
      onBackToMenu()
    } else if (showConfirm === 'restart') {
      onRestartPhase()
    }
    setShowConfirm(null)
  }

  const progressPercent = (matchedPairs.size / phase.pairs) * 100
  const timePercent = timeLimit > 0 ? (remainingTime / timeLimit) * 100 : 0
  const isTimeLow = remainingTime <= 30
  const isTimeWarning = !isTimeLow && remainingTime <= 60
  const timerClass = isTimeLow ? 'stat-timer-danger' : isTimeWarning ? 'stat-timer-warning' : ''
  const timerBarClass = isTimeLow ? 'timer-bar-danger' : isTimeWarning ? 'timer-bar-warning' : ''

  return (
    <div className="game-board-container">
<img src={gameBg} alt="" className="game-board-bg" aria-hidden="true" />
<ToastContainer toasts={toasts} />
{showConfirm && (
        <ConfirmModal
          title={showConfirm === 'menu' ? 'Voltar ao menu?' : 'Recomeçar fase?'}
          message={
            showConfirm === 'menu'
              ? 'Todo o progresso do jogo atual será perdido.'
              : 'O progresso desta fase será reiniciado.'
          }
          confirmText={showConfirm === 'menu' ? 'Sair' : 'Recomeçar'}
          cancelText="Continuar jogando"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(null)}
        />
      )}
<div className="game-header">
<div className="header-controls">
          <button
            className="control-btn"
            onClick={handleMenuClick}
            title="Voltar ao menu principal"
            id="back-to-menu-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="control-btn"
            onClick={handleRestartClick}
            title="Recomeçar esta fase"
            id="restart-phase-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
          <AudioPlayer />
        </div>
<div className="phase-indicator">
          <div className="phase-badges">
            {[1, 2, 3, 4, 5].map((p) => (
              <div
                key={p}
                className={`phase-badge ${p === currentPhaseIndex + 1 ? 'active' : ''} ${p < currentPhaseIndex + 1 ? 'completed' : ''}`}
                title={`Fase ${p}${p < currentPhaseIndex + 1 ? ' (completa)' : p === currentPhaseIndex + 1 ? ' (atual)' : ''}`}
              >
                {p < currentPhaseIndex + 1 ? '✓' : p}
              </div>
            ))}
          </div>
        </div>
<div className="game-stats">
          <div className={`stat stat-timer ${timerClass}`} title="Tempo restante">
            <span className="stat-label">Tempo</span>
            <span className="stat-value">{formatTime(remainingTime)}</span>
          </div>
          <div className="stat" title="Tentativas usadas">
            <span className="stat-label">Tentativas</span>
            <span className="stat-value">{attempts}</span>
          </div>
          <div className="stat" title="Pares encontrados">
            <span className="stat-label">Pares</span>
            <span className="stat-value">{matchedPairs.size}/{phase.pairs}</span>
          </div>
        </div>
      </div>
<div className="progress-bar-wrapper" title={`${Math.round(progressPercent)}% completo`}>
        <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="timer-bar-wrapper" title={`${Math.round(timePercent)}% do tempo restante`}>
        <div className={`timer-bar ${timerBarClass}`} style={{ width: `${timePercent}%` }} />
      </div>

      <div className="game-content">
<div className="game-left">
<div className="game-instruction">
            <span className="instruction-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 4 12.7V17a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2.3A7 7 0 0 1 12 2z"/></svg></span>
            <span>Clique em 2 cards para tentar combinar uma <strong>descrição</strong> com sua <strong>imagem</strong></span>
          </div>
<div className={`cards-grid cards-grid-${phase.pairs}`}>
            {cards.map((card, index) => (
              <Card
                key={card.uid}
                type={card.type}
                content={card.content}
                isFlipped={flippedCards.includes(index) || matchedPairs.has(card.pairId)}
                isMatched={matchedPairs.has(card.pairId)}
                disabled={isChecking || matchedPairs.has(card.pairId)}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>
<div className="game-right">
          <QuestionPanel
            questions={phase.questions}
            matchedPairIds={matchedPairs}
            phaseCards={cards}
          />
        </div>
      </div>
    </div>
  )
}

export default GameBoard