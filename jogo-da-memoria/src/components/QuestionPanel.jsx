import './QuestionPanel.css'

function QuestionPanel({ questions, matchedPairIds, phaseCards }) {
  // Mapear pairId para a descrição para saber quais perguntas foram respondidas
  const matchedAnswers = new Set()
  phaseCards.forEach((card) => {
    if (matchedPairIds.has(card.pairId)) {
      matchedAnswers.add(card.answer)
    }
  })

  return (
    <div className="question-panel">
      <div className="question-panel-header">
        <svg className="question-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <h3>Encontre os pares:</h3>
      </div>
      <ul className="question-list">
        {questions.map((question, index) => {
          const isFound = matchedAnswers.has(question)
          return (
            <li key={index} className={`question-item ${isFound ? 'found' : ''}`}>
              <span className="question-number">{index + 1}</span>
              <span className="question-text">{question}</span>
              {isFound && (
                <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default QuestionPanel
