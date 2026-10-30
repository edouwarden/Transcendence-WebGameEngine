import { readdirSync } from 'fs'
import { join } from 'path'

export function GET() {
  const dir = join(process.cwd(), 'public/game/models')
  let entries: string[] = []
  try {
    entries = readdirSync(dir)
  } catch {
    // Third-party assets are not distributed; see ASSETS.md.
    return Response.json([])
  }
  const folders = entries.filter(f => {
    try {
      return readdirSync(join(dir, f)).includes('scene.gltf')
    } catch {
      return false
    }
  })
  return Response.json(folders.map(f => ({
    name: f,
    path: `/game/models/${f}/scene.gltf`,
  })))
}