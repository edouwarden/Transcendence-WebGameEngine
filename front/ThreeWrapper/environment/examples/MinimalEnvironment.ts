import { Environment } from '../EnvironmentClass'
import { ResizeModule } from '@/ThreeWrapper/module/modules/rendering/ResizeModule'
export class MinimalEnvironment extends Environment {
  constructor() {
    super({ id: 'minimal' })
    this.addModule(new ResizeModule())
  }
}
