"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Navbar } from "./navbar.jsx";
import OrientationGuard from "./orientation-guard.jsx";
import Chat from "../chat/chat";
import Online from "@/components/cards/online-players";
import Privacy from "./privacy.jsx";
import LeaderBoard from "@/components/cards/leaderboard.jsx";
import FriendsPanel from "@/components/friends/friends-panel.jsx";
import { CharacterVisualizerWorld } from "@/ThreeWrapper/2.world/worlds/CharacterVisualizerWorld";
import { EngineCanvas } from "../../ThreeWrapper/1.engine/EngineCanvas";
import { Button } from "../animations/button.jsx";
import { api } from "@/lib/api";
import "./character_controls.css";
import "./home.css";

const BODY_COLORS = ["#03fc6f", "#5b8cff", "#ff8a3d", "#f4d35e", "#ff5d8f", "#9b8cff", "#3ddbd9", "#e8e8e8"];
const FACE_COLORS = ["#eeeeee", "#fff1e6", "#e8f0ff", "#ffe8f0", "#eaffea", "#f4eaff", "#e6fbff", "#d9dee8"];

export default function HomePage() {
	const router = useRouter();
	const [OptionsOpen, setOptionsOpen] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [PrivacyOpen, setPrivacyOpen] = useState(false);
	const [LeaderBoardOpen, setLeaderBoardOpen] = useState(false);
	const [YourFriendsOpen, setYourFriendsOpen] = useState(false);
	const [colorPanelOpen, setColorPanelOpen] = useState(false);
	const [worldApi, setWorldApi] = useState(null);
	const [username, setUsername] = useState("");
	const [currentBodyColor, setCurrentBodyColor] = useState("#03fc6f");
	const [currentFaceColor, setCurrentFaceColor] = useState("#eeeeee");
	const [isChangingColor, setIsChangingColor] = useState(false);
	const [colorsReady, setColorsReady] = useState(false);
	const characterArgsRef = useRef({
		bodyColor: "#03fc6f",
		faceColor: "#eeeeee",
		eyeColor: "#03fc6f",
		cameraPos: { x: 0, y: 1.12, z: 2.5 },
		cameraTarget: { x: 0, y: 0.93, z: 0 },
		cameraFov: 50,
		animation: "AN_Idle_A",
		background: false,
	});

	function getUserIDFromCookie() {
		const auth_token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("auth_token="))
			?.split("=")[1];
		if (!auth_token) return null;
		try {
			return JSON.parse(atob(auth_token.split(".")[1])).sub;
		} catch {
			return null;
		}
	}

	useEffect(() => {
		const userId = getUserIDFromCookie();
		if (!userId) {
			setColorsReady(true);
			return;
		}
		api.get("/api/users/" + userId)
			.then((data) => {
				const user = Array.isArray(data) ? data[0] : data;
				if (!user) return;
				setUsername(user.username || "");
				if (user.skin_color) {
					characterArgsRef.current.bodyColor = user.skin_color;
					setCurrentBodyColor(user.skin_color);
				}
				if (user.face_color) {
					characterArgsRef.current.faceColor = user.face_color;
					setCurrentFaceColor(user.face_color);
				}
			})
			.catch(console.error)
			.finally(() => setColorsReady(true));
	}, []);

	const handleBodyColorChange = async (color) => {
		setCurrentBodyColor(color);
		if (!worldApi) return;
		setIsChangingColor(true);
		try {
			await worldApi.setBodyColor(color);
			const userId = getUserIDFromCookie();
			if (userId) await api.patch("/api/users/" + userId, { skin_color: color });
		} catch (e) {
			console.error("Failed to save body color:", e);
		}
		setIsChangingColor(false);
	};

	const handleFaceColorChange = async (color) => {
		setCurrentFaceColor(color);
		if (!worldApi) return;
		setIsChangingColor(true);
		try {
			await worldApi.setFaceColor(color);
			const userId = getUserIDFromCookie();
			if (userId) await api.patch("/api/users/" + userId, { face_color: color });
		} catch (e) {
			console.error("Failed to save face color:", e);
		}
		setIsChangingColor(false);
	};

	function play() {
		setIsTransitioning(true);
		router.push("/online");
	}

	return (
		<OrientationGuard>
			<main className="home-screen">
				<div className="home-glow" />
				<Navbar OptionsOpen={OptionsOpen} setOptionsOpen={setOptionsOpen} />

				<motion.div
					className="home-stack"
					animate={{ opacity: isTransitioning ? 0 : 1 }}
					transition={{ duration: 0.25 }}
				>
					<div className="home-canvas">
						{colorsReady ? (
							<EngineCanvas
								config={{ mode: "standalone" }}
								world={() => new CharacterVisualizerWorld(characterArgsRef.current)}
								onReady={setWorldApi}
								style={{ width: "100%", height: "100%" }}
							/>
						) : (
							<span className="home-loading">Loading your runner…</span>
						)}
					</div>

					{username && <p className="home-name">{username}</p>}

					<div className="home-menu">
						<Button statement="Your friends" onClick={() => setYourFriendsOpen(true)} />
						<Button statement="Let's play" onClick={play} />
						<Button statement="Leaderboard" onClick={() => setLeaderBoardOpen(true)} />
					</div>

					<button className="home-customize" onClick={() => setColorPanelOpen((open) => !open)}>
						{colorPanelOpen ? "Close customization" : "Customize your runner"}
					</button>
				</motion.div>

				<aside className="home-chat">
					<Chat OptionsOpen={OptionsOpen} />
				</aside>

				<aside className="home-players">
					<Online />
				</aside>

				<AnimatePresence>
					{colorPanelOpen && (
						<motion.div
							className={`character-controls ${isChangingColor ? "loading" : ""}`}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.18 }}
						>
							<div className="control-section">
								<span className="control-label">Body</span>
								<div className="color-buttons">
									{BODY_COLORS.map((color) => (
										<button
											key={color}
											aria-label={`Body ${color}`}
											className={`color-btn ${currentBodyColor === color ? "active" : ""}`}
											style={{ backgroundColor: color }}
											onClick={() => handleBodyColorChange(color)}
										/>
									))}
								</div>
							</div>
							<div className="control-section">
								<span className="control-label">Face</span>
								<div className="color-buttons">
									{FACE_COLORS.map((color) => (
										<button
											key={color}
											aria-label={`Face ${color}`}
											className={`color-btn ${currentFaceColor === color ? "active" : ""}`}
											style={{ backgroundColor: color }}
											onClick={() => handleFaceColorChange(color)}
										/>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<button className="home-privacy" onClick={() => setPrivacyOpen(true)}>
					Privacy &amp; terms
				</button>

				{PrivacyOpen && (
					<div className="modal-overlay backdrop-blur-sm" onClick={() => setPrivacyOpen(false)}>
						<div onClick={(event) => event.stopPropagation()}>
							<Privacy setPrivacyOpen={setPrivacyOpen} />
						</div>
					</div>
				)}
				{LeaderBoardOpen && <LeaderBoard setLeaderBoardOpen={setLeaderBoardOpen} />}
				{YourFriendsOpen && <FriendsPanel setYourFriendsOpen={setYourFriendsOpen} />}
			</main>
		</OrientationGuard>
	);
}
