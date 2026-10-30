"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw, Skull } from "lucide-react";
import OrientationGuard from "../home/orientation-guard.jsx";
import "../result.css";

export default function LosePage() {
	const [leaving, setLeaving] = useState(false);
	const router = useRouter();

	function goHome() {
		setLeaving(true);
		router.push("/home");
	}

	return (
		<OrientationGuard>
			<main className="result-screen">
				<section className="result-card is-loss">
					<div className="result-mark">
						<Skull size={30} />
					</div>
					<span className="result-kicker">Round complete</span>
					<h1>Eliminated</h1>
					<p>
						You are out of lives. The course does not wait, but the lobby is
						always one click away.
					</p>
					<span className="result-meta">
						<i /> Season 01 · Spectator
					</span>

					<div className="result-actions">
						<button className="result-primary" onClick={goHome} disabled={leaving}>
							<RotateCcw size={16} />
							{leaving ? "Returning to lobby…" : "Back to lobby"}
						</button>
						<a className="result-secondary" href="/rules">
							<ArrowLeft size={15} /> Learn the course
						</a>
					</div>
				</section>
			</main>
		</OrientationGuard>
	);
}
