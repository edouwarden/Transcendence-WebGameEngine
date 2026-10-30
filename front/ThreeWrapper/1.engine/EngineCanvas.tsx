"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { EngineConfig, KeyBinding } from "shared/config";
import type { World } from "@/ThreeWrapper/2.world/WorldClass";
import { Engine } from "./Engine";
import { resolveWorld } from "@/ThreeWrapper/2.world/WorldRegistry";
type EngineCanvasProps = {
	config: Omit<EngineConfig, "canvas">;
	world: World | (() => World);
	keymap?: KeyBinding[];
	style?: React.CSSProperties;
	className?: string;
	onReady?: (world: World) => void;
};
export function EngineCanvas({ config, world, keymap, style, className, onReady }: EngineCanvasProps) {
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);
	const configRef = useRef(config);
	const worldRef = useRef(world);
	const keymapRef = useRef(keymap);
	const onReadyRef = useRef(onReady);
	useEffect(() => {
		onReadyRef.current = onReady;
	}, [onReady]);
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		let cancelled = false;
		const augmentedConfig: EngineConfig = {
			...configRef.current,
			onEndGame: (won: boolean) => {
				router.push(won ? "/winning" : "/lose");
			}
		};
		const engine = new Engine(augmentedConfig, keymapRef.current);
		engine.server?.setWorldResolver(resolveWorld);
		container.appendChild(engine.canvas);
		const resize = () => engine.resize(container.clientWidth, container.clientHeight);
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(container);
		const worldInstance = typeof worldRef.current === "function" ? worldRef.current() : worldRef.current;
		if (configRef.current.mode === "online") {
			engine.load(worldInstance).then(() => {
				// React StrictMode mounts, disposes and re-mounts this effect in dev.
				// Without this guard the disposed engine still connects from the
				// resolved promise, joins as the same user, and the server kicks the
				// live socket with SESSION_STOLEN → the page bounces back to /home.
				if (cancelled) return;
				engine.startActive();
				engine.start();
				engine.connect();
				onReadyRef.current?.(worldInstance);
			}).catch((error) => {
				if (!cancelled) console.error("[EngineCanvas] Failed to start online world:", error);
			});
		} else {
			engine.loadAndStart(worldInstance).then(() => {
				if (cancelled) return;
				engine.start();
				onReadyRef.current?.(worldInstance);
			}).catch((error) => {
				if (!cancelled) console.error("[EngineCanvas] Failed to start world:", error);
			});
		}
		return () => {
			cancelled = true;
			ro.disconnect();
			engine.dispose();
			if (container.contains(engine.canvas)) container.removeChild(engine.canvas);
		};
	}, []);
	return <div ref={containerRef} className={className} style={{ width: "100%", height: "100%", overflow: "hidden", ...style }} />;
}
