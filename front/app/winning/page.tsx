"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Crown, Gamepad2 } from "lucide-react";
import OrientationGuard from "../home/orientation-guard.jsx";
import "../result.css";

export default function WinningPage() {
	const [leaving, setLeaving] = useState(false);
	const router = useRouter();

	function goHome() {
		setLeaving(true);
		router.push("/home");
	}

	return (
		<OrientationGuard>
			<main className="result-screen">
				<section className="result-card">
					<div className="result-mark">
						<Crown size={32} />
					</div>
					<span className="result-kicker">Round complete</span>
					<h1>Victory</h1>
					<p>
						You were the last player on the course. One life was all you
						needed.
					</p>
					<span className="result-meta">
						<i /> Season 01 · Winner
					</span>

					<div className="result-actions">
						<button className="result-primary" onClick={goHome} disabled={leaving}>
							<Gamepad2 size={16} />
							{leaving ? "Returning to lobby…" : "Back to lobby"}
						</button>
						<a className="result-secondary" href="/rules">
							<ArrowLeft size={15} /> Review the rules
						</a>
					</div>
				</section>
			</main>
		</OrientationGuard>
	);
}
