"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Loader2, ShieldCheck } from "lucide-react";
import "./oauth.css";

const SCOPES = [
	{ label: "Public profile", detail: "login, display name, campus" },
	{ label: "Email address", detail: "used to create your Parkour Arena account" },
];

export default function Demo42Authorize() {
	const router = useRouter();
	const [state, setState] = useState("idle");
	const [error, setError] = useState("");

	async function authorize() {
		setState("loading");
		setError("");
		try {
			await fetch("/api/auth/login", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: "Lio@example.com", password: "Lio" }),
			}).then(async (res) => {
				if (!res.ok) throw new Error("The demo account is not available on this instance.");
			});
			setState("done");
			setTimeout(() => router.push("/home"), 550);
		} catch (err) {
			setState("idle");
			setError(err instanceof Error ? err.message : "Authorization failed.");
		}
	}

	return (
		<main className="oauth-screen">
			<div className="oauth-grid" aria-hidden="true" />
			<div className="oauth-card">
				<div className="oauth-top">
					<div className="oauth-logo" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="m24 12.42-4.428 4.415H24zm-4.428-4.417-4.414 4.418v4.414h4.414V12.42L24 8.003V3.575h-4.428zm-4.414 0 4.414-4.428h-4.414zM0 15.996h8.842v4.43h4.412V12.42H4.428l8.826-8.846H8.842L0 12.421z" />
						</svg>
					</div>
					<span className="oauth-kicker">42 OAuth · local demo</span>
					<h1>Authorize Parkour Arena</h1>
					<p>
						<strong>Parkour Arena</strong> is requesting access to your 42 account.
						Nothing is shared until you approve.
					</p>
				</div>

				<div className="oauth-app">
					<div className="oauth-app-mark">PA</div>
					<div>
						<div className="oauth-app-name">Parkour Arena</div>
						<div className="oauth-app-meta">localhost:4443 · verified app</div>
					</div>
					<ShieldCheck size={18} className="oauth-shield" />
				</div>

				<ul className="oauth-scopes">
					{SCOPES.map((scope) => (
						<li key={scope.label}>
							<span className="scope-check"><Check size={13} /></span>
							<div>
								<strong>{scope.label}</strong>
								<span>{scope.detail}</span>
							</div>
						</li>
					))}
				</ul>

				<div className="oauth-account">
					<span className="oauth-avatar">L</span>
					<div>
						<strong>Lio</strong>
						<span>lio@student.42.fr</span>
					</div>
					<button onClick={() => router.push("/login")}>Switch account</button>
				</div>

				{error && <div className="oauth-error">{error}</div>}

				<div className="oauth-actions">
					<button className="oauth-cancel" onClick={() => router.push("/login")} disabled={state !== "idle"}>
						<ArrowLeft size={15} /> Cancel
					</button>
					<button className="oauth-authorize" onClick={authorize} disabled={state !== "idle"}>
						{state === "loading" && <Loader2 size={16} className="oauth-spin" />}
						{state === "done" && <Check size={16} />}
						{state === "idle" ? "Authorize" : state === "loading" ? "Authorizing" : "Authorized"}
					</button>
				</div>

				<p className="oauth-fineprint">
					This page stands in for <code>api.intra.42.fr</code> in the local build. In
					production the same button opens the real 42 consent screen.
				</p>
			</div>
		</main>
	);
}
