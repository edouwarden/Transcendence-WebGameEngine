import { Environment } from '../EnvironmentClass'
import { ResizeModule, ModuleKey } from '@/ThreeWrapper/module'
import { CharacterOrbitCameraModule } from '@/ThreeWrapper/module/modules/editor/CharacterOrbitCameraModule'
import { CharacterCustomizerModule } from '@/ThreeWrapper/module/modules/editor/CharacterCustomizerModule'
import { CharacterCustomizerUIModule } from '@/ThreeWrapper/module/modules/editor/CharacterCustomizerUIModule'
export class CharacterCustomizerEnvironment extends Environment {
  constructor() {
    super({})
    this.addModule(new ResizeModule())
    this.addModule(new CharacterOrbitCameraModule())
    this.addModule(new CharacterCustomizerModule())
    this.addModule(new CharacterCustomizerUIModule())
  }
}
