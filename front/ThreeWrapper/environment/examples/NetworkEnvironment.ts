import { Environment } from '../EnvironmentClass'
import { ResizeModule } from '@/ThreeWrapper/module/modules/rendering/ResizeModule'
import { InputModule } from '@/ThreeWrapper/module/modules/input/InputModule'
import { PlayerControlModule, ModuleKey } from '@/ThreeWrapper/module'
import { NetworkPlayerModule } from '@/ThreeWrapper/module/examples/NetworkPlayerModule'
export class NetworkEnvironment extends Environment {
  constructor() {
    super({ id: 'network' })
    this.addModule(new ResizeModule())
    this.addModule(new InputModule())
    this.addModule(new PlayerControlModule({}, ModuleKey.input))
    this.addModule(new NetworkPlayerModule())
  }
}
