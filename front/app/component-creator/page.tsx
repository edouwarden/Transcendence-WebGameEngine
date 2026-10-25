'use client'
import { EngineCanvas } from '@/ThreeWrapper/engine/EngineCanvas'
import { ComponentCreatorWorld } from '@/ThreeWrapper/world/worlds/ComponentCreatorWorld'

export default function ComponentCreatorPage() {
  return (
    <EngineCanvas
      config={{ mode: 'standalone' }}
      world={() => new ComponentCreatorWorld()}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
