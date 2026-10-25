import { Environment } from '@/ThreeWrapper/environment/EnvironmentClass'
import { ResizeModule } from '@/ThreeWrapper/module/index'
export class VisualizerEnvironment extends Environment {
	constructor() {
		super({ id: 'visualizer' })
		this.addModule(new ResizeModule())
	}
}
