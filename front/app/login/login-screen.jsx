"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "../animations/button.jsx";
import "./login.css";

const DEMO_MODE = process.env.NODE_ENV !== "production";

export default function LoginScreen() {
	const router = useRouter();
	const [mode, setMode] = useState("signin");
	const [form, setForm] = useState({ email: "", password: "", username: "", age: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [sentTo, setSentTo] = useState("");

	const isSignUp = mode === "signup";
	const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

	function switchMode(next) {
		setMode(next);
		setError("");
		setSentTo("");
	}

	async function signIn() {
		await api.post("/api/auth/login", { email: form.email, password: form.password });
		const me = await api.get("/api/users/me");
		if (Array.isArray(me) && me[0] && me[0].verified === false) {
			throw new Error("Verify your email before signing in.");
		}
		router.push("/home");
	}

	async function signUp() {
		try {
			await api.post("/api/users/add", {
				email: form.email,
				password: form.password,
				username: form.username,
				age: Number(form.age),
				verified: false,
			});
		} catch (err) {
			// The account is created before the verification mail is queued. In the
			// local demo the SMTP credentials are fake, so the request can fail after
			// the user already exists. Treat that as a successful sign-up.
			const existing = await api.get(`/api/users/find?email=${encodeURIComponent(form.email)}`);
			if (!Array.isArray(existing) || existing.length === 0) throw err;
		}
		setSentTo(form.email);
	}

	async function handleSubmit(event) {
		event?.preventDefault();
		if (loading) return;
		if (!form.email || !form.password) {
			setError("Enter your email and password.");
			return;
		}
		if (isSignUp && (!form.username || !form.age)) {
			setError("Choose a username and enter your age.");
			return;
		}
		setError("");
		setLoading(true);
		try {
			if (isSignUp) await signUp();
			else await signIn();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setLoading(false);
		}
	}

	function handle42() {
		window.location.href = DEMO_MODE ? "/demo/42" : api.getUrl("/api/auth/42/login");
	}

	if (sentTo) {
		return (
			<main className="login-screen">
				<div className="login-backdrop" />
				<div className="verify-card">
					<h1>Check your inbox</h1>
					<p>
						We sent a verification link to <strong>{sentTo}</strong>. Open it, then come
						back and sign in.
					</p>
					{DEMO_MODE && (
						<div className="login-action">
							<Button
								statement="Open the demo inbox"
								onClick={() => router.push(`/demo/mail?email=${encodeURIComponent(sentTo)}`)}
							/>
						</div>
					)}
					<button className="btn-quiet" onClick={() => switchMode("signin")}>
						Back to sign in
					</button>
				</div>
			</main>
		);
	}

	return (
		<main className="login-screen">
			<div className="login-backdrop" />

			<div className="login-column">
				<h1 className="party-title login-title">
					Parkour Arena
				</h1>
				<p className="login-tagline">Here comes the Fun</p>

				<div className="auth-card">
					<div className="auth-tabs">
						<button
							type="button"
							className={!isSignUp ? "tab is-active" : "tab"}
							onClick={() => switchMode("signin")}
						>
							Sign in
						</button>
						<button
							type="button"
							className={isSignUp ? "tab is-active" : "tab"}
							onClick={() => switchMode("signup")}
						>
							Sign up
						</button>
					</div>

					<form onSubmit={handleSubmit} className="auth-form" noValidate>
						{isSignUp && (
							<label className="field">
								<span>Pseudo</span>
								<input
									value={form.username}
									onChange={update("username")}
									placeholder="Your pseudo here"
									autoComplete="username"
								/>
							</label>
						)}

						<label className="field">
							<span>Email</span>
							<input
								type="email"
								value={form.email}
								onChange={update("email")}
								placeholder="you@example.com"
								autoComplete="email"
							/>
						</label>

						{isSignUp && (
							<label className="field">
								<span>Age</span>
								<input
									value={form.age}
									onChange={update("age")}
									placeholder="18"
									inputMode="numeric"
									autoComplete="off"
								/>
							</label>
						)}

						<label className="field">
							<span>Password</span>
							<input
								type="password"
								value={form.password}
								onChange={update("password")}
								placeholder="Your password here"
								autoComplete={isSignUp ? "new-password" : "current-password"}
							/>
						</label>

						{error && <div className="form-error">{error}</div>}

						<div className="login-action">
							<Button
								type="submit"
								statement={loading ? "Let's go..." : isSignUp ? "Sign up" : "Let's play"}
								pressed={loading}
								isAdded={loading}
								onClick={handleSubmit}
							/>
						</div>
					</form>

					<div className="divider"><span>or</span></div>

					<button className="btn-42" onClick={handle42}>
						<span className="logo-42" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="currentColor">
								<path d="m24 12.42-4.428 4.415H24zm-4.428-4.417-4.414 4.418v4.414h4.414V12.42L24 8.003V3.575h-4.428zm-4.414 0 4.414-4.428h-4.414zM0 15.996h8.842v4.43h4.412V12.42H4.428l8.826-8.846H8.842L0 12.421z" />
							</svg>
						</span>
						Continue with 42
					</button>

					{DEMO_MODE && (
						<p className="demo-note">
							Local build — 42 and email use the bundled demo flow.
						</p>
					)}
				</div>
			</div>
		</main>
	);
}
