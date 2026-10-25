'use client'
import { EngineCanvas } from '@/ThreeWrapper/engine/EngineCanvas'
import { CharacterCustomizerWorld } from '@/ThreeWrapper/world/worlds/CharacterCustomizerWorld'

export default function CharacterCustomizerPage() {
  return (
    <EngineCanvas
      config={{ mode: 'standalone' }}
      world={() => new CharacterCustomizerWorld()}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
