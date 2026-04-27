import { useState, useEffect, useRef } from 'react'
import './AudioPlayer.css'
import musicSrc from '../assets/musica_de_fundo.mp3'

// Audio no nível do módulo — persiste entre remontagens do componente
let bgAudio = null

function getAudio() {
  if (!bgAudio) {
    bgAudio = new Audio(musicSrc)
    bgAudio.loop = true
  }
  return bgAudio
}

function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('game-audio-muted')
    return saved === 'true'
  })
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('game-audio-volume')
    return saved ? parseFloat(saved) : 0.2
  })
  const [showVolume, setShowVolume] = useState(false)
  const audioRef = useRef(getAudio())

  // Inicia a música quando o componente monta
  useEffect(() => {
    const audio = audioRef.current
    audio.volume = isMuted ? 0 : volume
    audio.play().catch(() => {})

    return () => {
      audio.pause()
    }
  }, [])

  // Atualiza volume/mute
  useEffect(() => {
    const audio = audioRef.current
    audio.volume = isMuted ? 0 : volume
    localStorage.setItem('game-audio-muted', String(isMuted))
    localStorage.setItem('game-audio-volume', String(volume))
  }, [isMuted, volume])

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    if (!newMuted) {
      audioRef.current.play().catch(() => {})
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
      audioRef.current.play().catch(() => {})
    }
  }

  return (
    <div
      className="audio-player"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <button
        className="control-btn audio-toggle"
        onClick={toggleMute}
        title={isMuted ? 'Ativar som' : 'Desativar som'}
        id="audio-toggle-btn"
      >
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>

      <div className={`volume-slider-wrapper ${showVolume ? 'visible' : ''}`}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
          id="volume-slider"
        />
      </div>
    </div>
  )
}

export default AudioPlayer
