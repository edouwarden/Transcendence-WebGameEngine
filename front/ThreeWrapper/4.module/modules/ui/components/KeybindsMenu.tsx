'use client'

import { useState, useEffect, useCallback } from 'react'
import { Keyboard, X } from 'lucide-react'
import type { KeyBinding } from 'shared/config'
import { KeyActionLabels } from 'shared/config'

type KeybindsMenuProps = {
  getBindings: () => KeyBinding[]
  onRebind: (action: string, key: string) => void
  onClose: () => void
}

function actionLabel(action: string): string {
  const label = KeyActionLabels[action as keyof typeof KeyActionLabels]
  if (label) return label
  return action
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function codeToLabel(code: string | undefined): string {
  if (!code) return '—'
  if (code.startsWith('Key')) return code.slice(3).toUpperCase()
  if (code.startsWith('Digit')) return code.slice(5)
  if (code === 'Space') return 'Space'
  if (code === 'ShiftLeft' || code === 'ShiftRight') return 'Shift'
  if (code === 'ControlLeft' || code === 'ControlRight') return 'Ctrl'
  return code
}

export function KeybindsMenu({ getBindings, onRebind, onClose }: KeybindsMenuProps) {
  const [listening, setListening] = useState<string | null>(null)
  const [bindings, setBindings] = useState<KeyBinding[]>(getBindings())

  useEffect(() => {
    setBindings(getBindings())
  }, [getBindings])

  function startListening(action: string) {
    setListening(action)
  }

  useEffect(() => {
    if (!listening) return

    const onKeyDown = (event: KeyboardEvent) => {
      event.preventDefault()
      const newBindings = bindings.map(b =>
        b.action === listening ? { ...b, key: event.code } : b
      )
      setBindings(newBindings)
      setListening(null)
      onRebind(listening, event.code)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [listening, bindings, onRebind])

  const handleClose = useCallback(() => {
    try {
      localStorage.setItem('game_keybindings', JSON.stringify(bindings))
    } catch (error) {
      console.error('[KeybindsMenu] Failed to save to localStorage:', error)
    }
    onClose()
  }, [bindings, onClose])

  return (
    <div className="app-pause">
      <div className="app-modal app-modal--sm app-pause-card">
        <header className="app-modal-head">
          <div className="app-modal-title">
            <Keyboard size={16} />
            <h2>
              Keyboard
              <span className="app-modal-sub">Click a binding, then press a key</span>
            </h2>
          </div>
          <button className="app-modal-close" onClick={handleClose} aria-label="Close keyboard settings">
            <X size={15} />
          </button>
        </header>

        <div className="app-modal-body">
          <div className="app-keybinds">
            {bindings.map((binding) => {
              const isListening = listening === binding.action
              return (
                <div className="app-keybind-row" key={binding.action}>
                  <span>{actionLabel(binding.action)}</span>
                  <button
                    className={`app-keybind ${isListening ? 'is-listening' : ''}`}
                    onClick={() => !isListening && startListening(binding.action)}
                  >
                    {isListening ? 'Press a key…' : codeToLabel(binding.key)}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <footer className="app-modal-foot">
          <span className="app-pause-hint">Bindings stay in this browser</span>
          <button className="app-btn" onClick={handleClose}>Cancel</button>
          <button className="app-btn app-btn--primary" onClick={handleClose}>Save</button>
        </footer>
      </div>
    </div>
  )
}
