import { useState, useCallback, useRef } from 'react'
import { generatePhases } from './data/phases'
import StartScreen from './components/StartScreen'
import GameBoard from './components/GameBoard'
import PhaseComplete from './components/PhaseComplete'
import GameComplete from './components/GameComplete'

function App() {
  const [gameState, setGameState] = useState('start') 
  const [phases, setPhases] = useState([])
  const [currentPhase, setCurrentPhase] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [lastPhaseAttempts, setLastPhaseAttempts] = useState(0)
  const [lastPhaseTime, setLastPhaseTime] = useState(0)
  const [phaseSuccess, setPhaseSuccess] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionCallback = useRef(null)

  const startGame = useCallback(() => {
    const newPhases = generatePhases()
    setPhases(newPhases)
    setCurrentPhase(0)
    setTotalAttempts(0)
    setGameState('playing')
  }, [])

  const handlePhaseComplete = useCallback((attempts, time) => {
    setLastPhaseAttempts(attempts)
    setLastPhaseTime(time || 0)
    setTotalAttempts((prev) => prev + attempts)
    setPhaseSuccess(true)
    setGameState('phaseResult')
  }, [])

  const handlePhaseFail = useCallback(() => {
    setPhaseSuccess(false)
    setGameState('phaseResult')
  }, [])

  const fadeAndExecute = useCallback((callback) => {
    setIsTransitioning(true)
    transitionCallback.current = callback
    setTimeout(() => {
      callback()
      setIsTransitioning(false)
    }, 400)
  }, [])

  const handleNextPhase = useCallback(() => {
    fadeAndExecute(() => {
      if (currentPhase >= 4) {
        setGameState('gameComplete')
      } else {
        setCurrentPhase((prev) => prev + 1)
        setGameState('playing')
      }
    })
  }, [currentPhase, fadeAndExecute])

  const handleRetryPhase = useCallback(() => {
    setPhases((prev) => {
      const newPhases = [...prev]
      const phase = newPhases[currentPhase]
      const shuffled = [...phase.cards].sort(() => Math.random() - 0.5)
      newPhases[currentPhase] = { ...phase, cards: shuffled }
      return newPhases
    })
    setGameState('playing')
  }, [currentPhase])

  const handleBackToMenu = useCallback(() => {
    setGameState('start')
  }, [])

  const handleRestartPhase = useCallback(() => {
    setPhases((prev) => {
      const newPhases = [...prev]
      const phase = newPhases[currentPhase]
      const shuffled = [...phase.cards].sort(() => Math.random() - 0.5)
      newPhases[currentPhase] = { ...phase, cards: shuffled }
      return newPhases
    })
    
    setGameState('start')
    setTimeout(() => setGameState('playing'), 0)
  }, [currentPhase])

  return (
    <>
      <div className={`app-transition ${isTransitioning ? 'fade-out' : ''}`}>
      {gameState === 'start' && (
        <StartScreen onStart={startGame} />
      )}

      {gameState === 'playing' && phases[currentPhase] && (
        <GameBoard
          key={`phase-${currentPhase}-${phases[currentPhase].cards[0]?.uid}`}
          phase={phases[currentPhase]}
          currentPhaseIndex={currentPhase}
          onPhaseComplete={handlePhaseComplete}
          onPhaseFail={handlePhaseFail}
          onBackToMenu={handleBackToMenu}
          onRestartPhase={handleRestartPhase}
        />
      )}

      {gameState === 'phaseResult' && (
        <PhaseComplete
          success={phaseSuccess}
          phaseNumber={currentPhase + 1}
          attempts={lastPhaseAttempts}
          elapsedTime={lastPhaseTime}
          totalPairs={phases[currentPhase]?.pairs || 0}
          onNext={handleNextPhase}
          onRetry={handleRetryPhase}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {gameState === 'gameComplete' && (
        <GameComplete
          totalAttempts={totalAttempts}
          onRestart={handleBackToMenu}
        />
      )}
      </div>
    </>
  )
}

export default App