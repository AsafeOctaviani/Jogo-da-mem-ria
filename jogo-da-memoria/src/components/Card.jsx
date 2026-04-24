import './Card.css'

function Card({ type, content, isFlipped, isMatched, onClick, disabled }) {
  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick()
    }
  }

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${disabled && !isMatched ? 'disabled' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={isFlipped ? (type === 'image' ? 'Card de imagem' : content) : 'Card virado para baixo'}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="card-inner">
        {}
        <div className="card-back">
          <div className="card-back-pattern">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3c-1.5 2-3 3.5-3 5.5a3 3 0 1 0 6 0c0-2-1.5-3.5-3-5.5z" />
              <path d="M12 21V12" />
              <path d="M9 15l3-3 3 3" />
              <path d="M7 19l5-5 5 5" />
            </svg>
            <span className="card-back-label">?</span>
          </div>

        </div>
        {}
        <div className={`card-front ${type === 'image' ? 'card-front-image' : 'card-front-text'}`}>
          {type === 'image' ? (
            <div className="card-image-wrapper">
              <img src={content} alt="Card de imagem" className="card-image" draggable="false" />
            </div>
          ) : (
            <div className="card-text-wrapper">
              <p className="card-text">{content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card