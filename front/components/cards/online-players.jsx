"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { api } from "@/lib/api";
import "./players.css";

function getCurrentUserId() {
	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("auth_token="))
		?.split("=")[1];
	if (!token) return null;
	try {
		return Number(JSON.parse(atob(token.split(".")[1])).sub);
	} catch {
		return null;
	}
}

export default function Online() {
	const [players, setPlayers] = useState([]);
	const [online, setOnline] = useState([]);
	const [selfId, setSelfId] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setSelfId(getCurrentUserId());
		let alive = true;

		async function poll() {
			try {
				const [all, connected] = await Promise.all([
					api.get("/api/users"),
					api.get("/api/chat/online"),
				]);
				if (!alive) return;
				setPlayers(Array.isArray(all) ? all : []);
				setOnline(Array.isArray(connected) ? connected : []);
			} catch (error) {
				console.error(error);
			} finally {
				if (alive) setLoading(false);
			}
		}

		poll();
		const interval = setInterval(poll, 5000);
		return () => {
			alive = false;
			clearInterval(interval);
		};
	}, []);

	const onlineIds = new Set(online.map((player) => player.id));
	const sorted = [...players].sort((a, b) => {
		const aOnline = onlineIds.has(a.id) ? 0 : 1;
		const bOnline = onlineIds.has(b.id) ? 0 : 1;
		return aOnline - bOnline || a.username.localeCompare(b.username);
	});
	const onlineCount = players.filter((player) => onlineIds.has(player.id)).length;

	return (
		<section className="players-panel" aria-label="Players">
			<header className="players-head">
				<div className="players-title">
					<Users size={15} />
					<span>Players</span>
				</div>
				<span className="players-count">
					<span className="players-count-dot" />
					{onlineCount} online
				</span>
			</header>

			<div className="players-list">
				{loading && <div className="players-note">Loading roster…</div>}
				{!loading && sorted.length === 0 && <div className="players-note">No players yet.</div>}
				{sorted.map((player) => {
					const isOnline = onlineIds.has(player.id);
					const isSelf = player.id === selfId;
					return (
						<div className={`player-row ${isOnline ? "is-online" : ""}`} key={player.id}>
							<span
								className="player-avatar"
								style={{
									background: player.skin_color ? `${player.skin_color}1f` : undefined,
									borderColor: player.skin_color ? `${player.skin_color}55` : undefined,
									color: player.skin_color || undefined,
								}}
							>
								{player.username?.slice(0, 1).toUpperCase() || "?"}
								<span className={`player-status ${isOnline ? "is-online" : ""}`} />
							</span>
							<div className="player-meta">
								<strong>
									{player.username}
									{isSelf && <span className="player-you">you</span>}
								</strong>
								<span>{isOnline ? "In the lobby" : "Offline"}</span>
							</div>
							<span className="player-state">{isOnline ? "Ready" : "Away"}</span>
						</div>
					);
				})}
			</div>

			<footer className="players-foot">
				<span>Updates every 5s</span>
			</footer>
		</section>
	);
}
