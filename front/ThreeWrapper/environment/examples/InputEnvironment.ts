import { Environment } from '../EnvironmentClass'
import { ResizeModule } from '@/ThreeWrapper/module/modules/rendering/ResizeModule'
import { InputModule } from '@/ThreeWrapper/module/modules/input/InputModule'
export class InputEnvironment extends Environment {
  constructor() {
    super({ id: 'input' })
    this.addModule(new ResizeModule())
    this.addModule(new InputModule())
  }
}
