import { Environment } from '../EnvironmentClass'
import { ResizeModule } from '@/ThreeWrapper/module/modules/rendering/ResizeModule'
import { ObjectInteractionModule } from '@/ThreeWrapper/module/examples/ObjectInteractionModule'
export class InteractiveEnvironment extends Environment {
  constructor() {
    super({ id: 'interactive' })
    this.addModule(new ResizeModule())
    this.addModule(new ObjectInteractionModule())
  }
}
