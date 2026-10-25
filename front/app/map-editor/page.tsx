'use client'
import { EngineCanvas } from '@/ThreeWrapper/engine/EngineCanvas'
import { EditorWorld } from '@/ThreeWrapper/world/worlds/EditorWorld'

export default function EditorPage() {
  return (
    <EngineCanvas
      config={{ mode: 'standalone' }}
      world={() => new EditorWorld()}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
