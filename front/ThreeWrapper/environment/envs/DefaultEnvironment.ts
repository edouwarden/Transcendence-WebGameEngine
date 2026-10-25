import { ResizeModule, UIModule, EscapeUIModule, ModuleKey, InputModule } from "@/ThreeWrapper/module/index";
import { Environment } from "@/ThreeWrapper/environment/EnvironmentClass";
export class DefaultEnvironment extends Environment {
	constructor() {
		super({ id: "default" });
		this.addModule(new ResizeModule());
		this.addModule(new InputModule);
		this.addModule(new EscapeUIModule(ModuleKey.ui, ModuleKey.input));
	}
}
