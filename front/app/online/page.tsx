"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoWorld } from "@/ThreeWrapper/world/worlds/DemoWorld";
import { EngineCanvas } from "../../ThreeWrapper/engine/EngineCanvas";
import { ConnectingWorld } from "@/ThreeWrapper/world/worlds/ConnectingWorld";

export default function OnlinePage() {
	const [engineReady, setEngineReady] = useState(false);

	return (
		<>
			<EngineCanvas
				config={{
					mode: "online",
					serverUrl: process.env.NEXT_PUBLIC_GAME_SERVER_URL || "wss://localhost/server/",
					debug: { enabled: true }
				}}
				world={() => new ConnectingWorld()}
				onReady={() => setEngineReady(true)}
				style={{ width: "100vw", height: "100vh" }}
			/>
		</>
	);
}
