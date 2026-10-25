import { Environment } from '@/ThreeWrapper/environment/EnvironmentClass'
import { ResizeModule } from '@/ThreeWrapper/module/index'
export class UIEnvironment extends Environment {
	constructor() {
		super({ id: 'ui' })
		this.addModule(new ResizeModule())
	}
}
