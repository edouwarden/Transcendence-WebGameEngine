import { Environment } from '../EnvironmentClass'
import { ResizeModule } from '@/ThreeWrapper/module/modules/rendering/ResizeModule'
import { InputModule } from '@/ThreeWrapper/module/modules/input/InputModule'
import { FreecamModule } from '@/ThreeWrapper/module/modules/camera/FreecamModule'
export class DebugEnvironment extends Environment {
  constructor() {
    super({ id: 'debug' })
    this.addModule(new ResizeModule())
    this.addModule(new InputModule())
    this.addModule(new FreecamModule())
  }
}
