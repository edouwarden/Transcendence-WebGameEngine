import { createElement } from "react";
import type { Module, WorldContext } from "@/ThreeWrapper/4.module";
import { ModuleKey } from "@/ThreeWrapper/4.module";
import type { InputModule } from "../input/InputModule";

export class LobbyReadyModule implements Module {
	readonly type = "lobby_ready";
	readonly requires = [ModuleKey.input] as const;
	private ctx: WorldContext | null = null;
	private input: InputModule | null = null;
	private readyPressed = false;
	private isReady = false;

	init(ctx: WorldContext): void {
		this.ctx = ctx;
		this.input = ctx.getModule<InputModule>(ModuleKey.input) ?? null;
		if (!this.input) {
			console.warn("[LobbyReadyModule] InputModule not found");
			return;
		}
		const interactKey = ctx.keymap.getKey("interact")!;
		this.input.setKeyBinding(interactKey, {
			action: "interact",
			onDown: () => {
				if (!this.isReady) {
					this.readyPressed = true;
				}
			}
		});
	}

	start(): void {
		if (!this.ctx) return;
		const rawKey = this.ctx.keymap.getKey("interact") ?? "KeyE";
		const keyLabel = rawKey.startsWith("Key") ? rawKey.slice(3).toUpperCase() : rawKey.replace("Left", "").replace("Right", "");
		this.renderPrompt(`Press ${keyLabel} to ready up`, "#7cf56a", "rgba(124, 245, 106, 0.14)");
	}

	private renderPrompt(label: string, dotColor: string, dotShadow: string): void {
		if (!this.ctx) return;
		this.ctx.uiModule?.show(
			"lobby-ready-prompt",
			createElement(
				"div",
				{
					style: {
						position: "absolute",
						bottom: "32px",
						left: "50%",
						transform: "translateX(-50%)",
						display: "flex",
						alignItems: "center",
						gap: "9px",
						color: "#e7edf7",
						fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
						fontSize: "12.5px",
						letterSpacing: "0.01em",
						background: "rgba(9, 15, 28, 0.82)",
						border: "1px solid rgba(255, 255, 255, 0.1)",
						padding: "10px 15px",
						borderRadius: "10px",
						boxShadow: "0 18px 40px rgba(0, 0, 0, 0.4)",
						backdropFilter: "blur(10px)",
						pointerEvents: "none",
						whiteSpace: "nowrap",
					}
				},
				createElement("span", {
					style: {
						width: "6px",
						height: "6px",
						borderRadius: "50%",
						background: dotColor,
						boxShadow: `0 0 0 3px ${dotShadow}`,
					}
				}),
				createElement("span", null, label)
			)
		);
		this.ctx.uiModule?.disablePointer("lobby-ready-prompt");
	}

	update(_delta: number): void {
		if (!this.ctx || !this.input || !this.ctx.server) return;
		if (this.readyPressed && !this.isReady) {
			this.ctx.server.send.playerReady();
			this.isReady = true;
			this.renderPrompt("Ready — waiting for others…", "#facc15", "rgba(250, 204, 21, 0.14)");
			console.log("[LobbyReadyModule] Player sent ready signal");
		}
		this.readyPressed = false;
	}

	dispose(): void {
		this.ctx?.uiModule?.hide("lobby-ready-prompt");
		this.ctx = null;
		this.input = null;
	}
}