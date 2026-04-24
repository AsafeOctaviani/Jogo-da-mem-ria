import './ConfirmModal.css'

function ConfirmModal({ title, message, confirmText, cancelText, onConfirm, onCancel, variant = 'warning' }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className={`confirm-modal confirm-${variant}`} onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          {variant === 'warning' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="confirm-btn confirm-cancel" onClick={onCancel}>
            {cancelText || 'Cancelar'}
          </button>
          <button className="confirm-btn confirm-proceed" onClick={onConfirm}>
            {confirmText || 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
