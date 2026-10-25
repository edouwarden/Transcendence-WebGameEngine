import { Environment } from '../EnvironmentClass'
import { ResizeModule } from '@/ThreeWrapper/module/modules/rendering/ResizeModule'
import { InputModule } from '@/ThreeWrapper/module/modules/input/InputModule'
import { PlayerControlModule, ModuleKey } from '@/ThreeWrapper/module'
export class FPSEnvironment extends Environment {
  constructor() {
    super({ id: 'fps' })
    this.addModule(new ResizeModule())
    this.addModule(new InputModule())
    this.addModule(new PlayerControlModule({ moveSpeed: 5 }, ModuleKey.input))
  }
}
