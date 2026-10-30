"use client";

import React, { useEffect, useState } from "react";
import { Gamepad2, Skull, Trophy } from "lucide-react";
import { api } from "@/lib/api";
import "./stats.css";

type Stats = {
	games_played: number;
	wins: number;
	total_deaths: number;
};

export default function KpiCardContainer(): React.JSX.Element {
	const [stats, setStats] = useState<Stats | null>(null);

	useEffect(() => {
		async function fetchStats() {
			try {
				const idData = await api.get<{ id: number }[]>("/api/users/me");
				if (!idData?.[0]) return;
				const data = await api.get<{ stats: Stats }>(`/api/users/${idData[0].id}/stats`);
				if (data?.stats) setStats(data.stats);
			} catch (error) {
				console.error(error);
			}
		}
		fetchStats();
	}, []);

	const items = [
		{ label: "Games played", value: stats?.games_played ?? 0, icon: <Gamepad2 size={15} /> },
		{ label: "Wins", value: stats?.wins ?? 0, icon: <Trophy size={15} /> },
		{ label: "Deaths", value: stats?.total_deaths ?? 0, icon: <Skull size={15} /> },
	];

	return (
		<section className="stat-row" aria-label="Your stats">
			{items.map((item) => (
				<div className="stat-tile" key={item.label}>
					<span className="stat-icon">{item.icon}</span>
					<div className="stat-copy">
						<span className="stat-label">{item.label}</span>
						<span className="stat-value">{item.value}</span>
					</div>
				</div>
			))}
		</section>
	);
}
