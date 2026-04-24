import { useState, useEffect, useCallback, useRef } from 'react'
import Card from './Card'
import QuestionPanel from './QuestionPanel'
import ToastContainer, { useToast } from './Toast'
import ConfirmModal from './ConfirmModal'
import { MAX_ATTEMPTS } from '../data/phases'
import './GameBoard.css'

function GameBoard({ phase, onPhaseComplete, onPhaseFail, onBackToMenu, onRestartPhase, currentPhaseIndex }) {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(new Set())
  const [attempts, setAttempts] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [shakeCards, setShakeCards] = useState(new Set())
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showConfirm, setShowConfirm] = useState(null) 
  const timerRef = useRef(null)
  const { toasts, showToast } = useToast()

  useEffect(() => {
    setCards([...phase.cards])
    setFlippedCards([])
    setMatchedPairs(new Set())
    setAttempts(0)
    setIsChecking(false)
    setShakeCards(new Set())
    setElapsedTime(0)
  }, [phase])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleCardClick = useCallback((index) => {
    if (isChecking) return
    if (flippedCards.length >= 2) return
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
        
        showToast('Par encontrado! 🎉', 'success')
        setTimeout(() => {
          setMatchedPairs((prev) => {
            const next = new Set(prev)
            next.add(card1.pairId)

            if (next.size === phase.pairs) {
              clearInterval(timerRef.current)
              setTimeout(() => onPhaseComplete(newAttempts, elapsedTime), 600)
            }
            return next
          })
          setFlippedCards([])
          setIsChecking(false)
        }, 600)
      } else {
        
        const remaining = MAX_ATTEMPTS - newAttempts

        if (remaining === 3) {
          showToast('Atenção! Restam apenas 3 tentativas', 'warning', 3000)
        } else if (remaining === 1) {
          showToast('Última tentativa!', 'error', 3000)
        }

        setTimeout(() => {
          setShakeCards(new Set([first, second]))
          setTimeout(() => {
            setShakeCards(new Set())
            setFlippedCards([])
            setIsChecking(false)

            if (newAttempts >= MAX_ATTEMPTS) {
              clearInterval(timerRef.current)
              setTimeout(() => onPhaseFail(), 300)
            }
          }, 500)
        }, 800)
      }
    }
  }, [isChecking, flippedCards, attempts, cards, phase, onPhaseComplete, onPhaseFail, showToast, elapsedTime])

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

  const attemptsLeft = MAX_ATTEMPTS - attempts
  const progressPercent = (matchedPairs.size / phase.pairs) * 100

  return (
    <div className="game-board-container">
      {}
      <ToastContainer toasts={toasts} />

      {}
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

      {}
      <div className="game-header">
        {}
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
        </div>

        {}
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

        {}
        <div className="game-stats">
          <div className="stat stat-timer" title="Tempo decorrido">
            <span className="stat-label">Tempo</span>
            <span className="stat-value">{formatTime(elapsedTime)}</span>
          </div>
          <div className={`stat ${attemptsLeft <= 3 ? 'stat-danger' : ''}`} title="Tentativas restantes">
            <span className="stat-label">Tentativas</span>
            <span className="stat-value">{attemptsLeft}/{MAX_ATTEMPTS}</span>
          </div>
          <div className="stat" title="Pares encontrados">
            <span className="stat-label">Pares</span>
            <span className="stat-value">{matchedPairs.size}/{phase.pairs}</span>
          </div>
        </div>
      </div>

      {}
      <div className="progress-bar-wrapper" title={`${Math.round(progressPercent)}% completo`}>
        <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="game-content">
        {}
        <div className="game-left">
          {}
          <div className="game-instruction">
            <span className="instruction-icon">💡</span>
            <span>Clique em 2 cards para tentar combinar uma <strong>descrição</strong> com sua <strong>imagem</strong></span>
          </div>

          {}
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

        {}
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