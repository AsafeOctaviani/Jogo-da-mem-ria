import './Card.css'
import cardBackImg from '../assets/card-back.png'

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
        <div className="card-back">
          <img src={cardBackImg} alt="" className="card-back-image" draggable="false" />
        </div>
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