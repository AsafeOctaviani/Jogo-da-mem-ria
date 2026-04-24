import './StartScreen.css'

function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="start-content">
        <div className="start-logo">
          <svg viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" />
            <path
              d="M40 18C38 24 28 30 28 40C28 46.627 33.373 52 40 52C46.627 52 52 46.627 52 40C52 30 42 24 40 18Z"
              fill="#10b981"
              opacity="0.8"
            />
            <path d="M40 52V62" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M34 58C37 56 40 56 40 56" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <path d="M46 58C43 56 40 56 40 56" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="start-title">
          Jogo da Memória
          <span className="start-title-accent">Sustentável</span>
        </h1>

        <p className="start-description">
          Teste seus conhecimentos sobre sustentabilidade! Combine as descrições
          com as imagens corretas em 5 fases de dificuldade crescente.
        </p>

        <div className="start-rules">
          <div className="rule">
            <span className="rule-icon">🃏</span>
            <span>Combine descrição + imagem</span>
          </div>
          <div className="rule">
            <span className="rule-icon">🎯</span>
            <span>Máximo 10 tentativas por fase</span>
          </div>
          <div className="rule">
            <span className="rule-icon">📈</span>
            <span>5 fases com dificuldade crescente</span>
          </div>
        </div>

        <button className="start-button" onClick={onStart} id="start-game-btn">
          <span>Jogar</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
<div className="particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}>🍃</div>
        ))}
      </div>
    </div>
  )
}

export default StartScreen