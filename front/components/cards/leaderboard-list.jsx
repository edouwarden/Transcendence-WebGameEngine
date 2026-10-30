"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

export default function LeaderBoardList() {
	const [players, setPlayers] = useState([]);
	const [playerStats, setPlayerStats] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let alive = true;

		async function load() {
			try {
				const data = await api.get("/api/users");
				if (!alive || !Array.isArray(data)) return;
				setPlayers(data);

				const stats = {};
				await Promise.all(
					data.map(async (player) => {
						try {
							const statsData = await api.get(`/api/users/${player.id}/stats`);
							stats[player.id] = statsData?.stats?.wins ?? 0;
						} catch {
							stats[player.id] = 0;
						}
					})
				);
				if (!alive) return;
				setPlayerStats(stats);
			} catch (error) {
				console.error(error);
			} finally {
				if (alive) setLoading(false);
			}
		}

		load();
		return () => {
			alive = false;
		};
	}, []);

	const sortedPlayers = useMemo(
		() => [...players].sort((a, b) => (playerStats[b.id] || 0) - (playerStats[a.id] || 0)),
		[players, playerStats]
	);

	if (loading) {
		return (
			<div className="app-empty">
				<strong>Loading rankings…</strong>
				<span>Fetching players and match results.</span>
			</div>
		);
	}

	if (sortedPlayers.length === 0) {
		return (
			<div className="app-empty">
				<strong>No ranked players yet</strong>
				<span>Play a round to appear on the board.</span>
			</div>
		);
	}

	return (
		<ol className="app-list">
			{sortedPlayers.map((player, index) => {
				const initials = (player.username || "?").slice(0, 2).toUpperCase();
				return (
					<li className="app-list-row" key={player.id}>
						<span className="app-rank">{index + 1}</span>
						<span
							className="app-avatar"
							style={
								player.skin_color
									? {
											background: `${player.skin_color}1f`,
											borderColor: `${player.skin_color}55`,
											color: player.skin_color,
										}
									: undefined
							}
						>
							{initials}
						</span>
						<span className="app-list-copy">
							<strong>{player.username}</strong>
							<span>{playerStats[player.id] || 0} wins this season</span>
						</span>
						<span className="app-wins">{playerStats[player.id] || 0} W</span>
					</li>
				);
			})}
		</ol>
	);
}
