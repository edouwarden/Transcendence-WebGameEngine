import { ResizeModule } from '@/ThreeWrapper/module/modules/rendering/ResizeModule'
import { Environment } from '@/ThreeWrapper/environment/EnvironmentClass'
export class MinimalEnvironment extends Environment {
  constructor() {
    super({ id: 'minimal' })
    this.addModule(new ResizeModule())
  }
}
