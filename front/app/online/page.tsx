"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoWorld } from "@/ThreeWrapper/2.world/worlds/DemoWorld";
import { EngineCanvas } from "../../ThreeWrapper/1.engine/EngineCanvas";
import { ConnectingWorld } from "@/ThreeWrapper/2.world/worlds/ConnectingWorld";

const CONFIGURED_SERVER = process.env.NEXT_PUBLIC_GAME_SERVER_URL;

function resolveServerUrl(): string {
	// Same as the API: a wss://localhost URL baked into the build only works on
	// the machine that built it. Derive the socket URL from the current origin.
	if (typeof window !== "undefined") {
		const isLocal = !CONFIGURED_SERVER || /^wss?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(CONFIGURED_SERVER);
		if (isLocal) {
			const scheme = window.location.protocol === "https:" ? "wss:" : "ws:";
			return `${scheme}//${window.location.host}/server/`;
		}
	}
	return CONFIGURED_SERVER || "wss://localhost:4443/server/";
}

export default function OnlinePage() {
	const [engineReady, setEngineReady] = useState(false);
	const serverUrl = resolveServerUrl();

	return (
		<>
			<EngineCanvas
				config={{
					mode: "online",
					serverUrl,
					debug: { enabled: true }
				}}
				world={() => new ConnectingWorld()}
				onReady={() => setEngineReady(true)}
				style={{ width: "100vw", height: "100vh" }}
			/>
		</>
	);
}
