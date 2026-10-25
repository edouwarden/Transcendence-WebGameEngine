import { Environment } from '../EnvironmentClass'
import { ResizeModule, ModuleKey } from '@/ThreeWrapper/module'
import { EditorOrbitCameraModule } from '@/ThreeWrapper/module/modules/editor/EditorOrbitCameraModule'
import { EditorPlacementModule } from '@/ThreeWrapper/module/modules/editor/EditorPlacementModule'
import { EditorHotbarModule } from '@/ThreeWrapper/module/modules/editor/EditorHotbarModule'
import { EditorTestModeModule } from '@/ThreeWrapper/module/modules/editor/EditorTestModeModule'
export class EditorEnvironment extends Environment {
  constructor() {
    super({})
    this.addModule(new ResizeModule())
    this.addModule(new EditorOrbitCameraModule())
    this.addModule(new EditorPlacementModule())
    this.addModule(new EditorHotbarModule(ModuleKey.ui, ModuleKey.editorPlacement))
    this.addModule(new EditorTestModeModule())
  }
}
