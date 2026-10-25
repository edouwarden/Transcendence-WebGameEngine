import { Environment } from '../EnvironmentClass'
import { ResizeModule, ModuleKey } from '@/ThreeWrapper/module'
import { ComponentOrbitCameraModule } from '@/ThreeWrapper/module/modules/editor/ComponentOrbitCameraModule'
import { ComponentPreviewModule } from '@/ThreeWrapper/module/modules/editor/ComponentPreviewModule'
import { ComponentCreatorUIModule } from '@/ThreeWrapper/module/modules/editor/ComponentCreatorUIModule'
export class ComponentCreatorEnvironment extends Environment {
  constructor() {
    super({})
    this.addModule(new ResizeModule())
    this.addModule(new ComponentOrbitCameraModule())
    this.addModule(new ComponentPreviewModule())
    this.addModule(new ComponentCreatorUIModule(ModuleKey.ui, ModuleKey.componentCreatorPreview))
  }
}
