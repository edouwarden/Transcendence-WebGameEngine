'use client'

import { Keyboard, LogOut, Play, X } from "lucide-react"

type EscapeMenuProps = {
  onResume: () => void
  onKeybinds: () => void
  onReturnToLobby?: () => void
}

export function EscapeMenu({ onResume, onKeybinds, onReturnToLobby }: EscapeMenuProps) {
  return (
    <div className="app-pause">
      <div className="app-modal app-modal--sm app-pause-card">
        <header className="app-modal-head">
          <div className="app-modal-title">
            <span className="app-pause-dot" />
            <h2>
              Paused
              <span className="app-modal-sub">Match in progress</span>
            </h2>
          </div>
          <button className="app-modal-close" onClick={onResume} aria-label="Resume match">
            <X size={15} />
          </button>
        </header>

        <div className="app-modal-body app-modal-body--flush">
          <nav className="app-menu-list" aria-label="Pause menu">
            <button className="app-menu-row" onClick={onResume}>
              <Play size={15} />
              <span>Resume match</span>
              <span className="app-menu-meta">Esc</span>
            </button>
            <button className="app-menu-row" onClick={onKeybinds}>
              <Keyboard size={15} />
              <span>Keyboard settings</span>
            </button>
            {onReturnToLobby && (
              <>
                <div style={{ height: 1, margin: "4px 6px", background: "rgba(255,255,255,.07)" }} />
                <button className="app-menu-row is-danger" onClick={onReturnToLobby}>
                  <LogOut size={15} />
                  <span>Return to lobby</span>
                </button>
              </>
            )}
          </nav>
        </div>

        <footer className="app-modal-foot app-pause-foot">
          <span>One life · Last one standing</span>
        </footer>
      </div>
    </div>
  )
}
