"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	Inbox,
	Loader2,
	Mail,
	Search,
	Send,
	ShieldCheck,
	Star,
	Tag,
	Trash2,
} from "lucide-react";
import "./mail.css";

const MESSAGES = [
	{
		id: "welcome",
		from: "Parkour Arena",
		address: "hello@parkour.arena",
		subject: "Welcome to the arena",
		preview: "Your account is ready. Here is what happens next.",
		time: "09:41",
	},
	{
		id: "verify",
		from: "Parkour Arena",
		address: "no-reply@parkour.arena",
		subject: "Confirm your email address",
		preview: "One click and your player is ready to drop in.",
		time: "09:42",
	},
];

function MailInbox() {
	const router = useRouter();
	const params = useSearchParams();
	const email = params.get("email") || "you@example.com";
	const [selected, setSelected] = useState("verify");
	const [status, setStatus] = useState("idle");
	const [username, setUsername] = useState("");

	useEffect(() => {
		let alive = true;
		fetch(`/api/users/find?email=${encodeURIComponent(email)}`)
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => {
				const user = Array.isArray(data) ? data[0] : data;
				if (alive && user?.username) setUsername(user.username);
			})
			.catch(() => {});
		return () => {
			alive = false;
		};
	}, [email]);

	const displayName = username || email.split("@")[0] || "player";
	const initials = useMemo(() => displayName.slice(0, 2).toUpperCase(), [displayName]);
	const active = MESSAGES.find((message) => message.id === selected) || MESSAGES[1];

	function verify() {
		setStatus("loading");
		setTimeout(() => setStatus("done"), 900);
	}

	return (
		<main className="mail-screen">
			<div className="mail-topbar">
				<div className="mail-brand">
					<span className="mail-brand-mark">PA</span>
					<span>Parkour Arena Mail</span>
					<span className="mail-badge">local demo</span>
				</div>
				<div className="mail-account">
					<span className="mail-avatar">{initials}</span>
					<span>{email}</span>
				</div>
			</div>

			<div className="mail-shell">
				<aside className="mail-sidebar">
					<button className="mail-compose" onClick={() => router.push("/login")}>
						<span className="mail-compose-icon"><ArrowLeft size={14} /></span>
						Back to sign in
					</button>
					<nav className="mail-folders">
						<button className="is-active"><Inbox size={15} /> Inbox <span>2</span></button>
						<button><Star size={15} /> Starred</button>
						<button><Send size={15} /> Sent</button>
						<button><Tag size={15} /> Labels</button>
						<button><Trash2 size={15} /> Trash</button>
					</nav>
					<div className="mail-sidebar-note">
						<ShieldCheck size={14} />
						<p>
							This inbox stands in for Gmail in the local build. The production
							service sends the same message over SMTP.
						</p>
					</div>
				</aside>

				<section className="mail-list">
					<div className="mail-search">
						<Search size={15} />
						<input placeholder="Search mail" aria-label="Search mail" />
					</div>
					<div className="mail-list-label">Inbox · 2 messages</div>
					{MESSAGES.map((message) => (
						<button
							key={message.id}
							className={`mail-row ${selected === message.id ? "is-selected" : ""}`}
							onClick={() => setSelected(message.id)}
						>
							<span className={`mail-dot ${message.id === "verify" ? "is-unread" : ""}`} />
							<span className="mail-row-body">
								<span className="mail-row-top">
									<strong>{message.from}</strong>
									<time>{message.time}</time>
								</span>
								<span className="mail-row-subject">{message.subject}</span>
								<span className="mail-row-preview">{message.preview}</span>
							</span>
						</button>
					))}
				</section>

				<section className="mail-reader">
					{selected === "welcome" ? (
						<div className="mail-message">
							<header className="mail-message-head">
								<span className="mail-message-icon"><Mail size={18} /></span>
								<div>
									<h1>Welcome to the arena</h1>
									<p>Parkour Arena &lt;hello@parkour.arena&gt; · 09:41</p>
								</div>
							</header>
							<div className="mail-message-body">
								<p>Hi {displayName},</p>
								<p>
									Your Parkour Arena account exists. Pick a body, ready up with
									your friends and race across the course. One life, last one
									standing.
								</p>
								<div className="mail-card">
									<span className="mail-card-kicker">Next step</span>
									<p>Confirm your email address so we can keep your account recoverable.</p>
								</div>
								<p className="mail-signoff">See you on the course.<br />The Parkour Arena team</p>
							</div>
						</div>
					) : (
						<div className="mail-message">
							<header className="mail-message-head">
								<span className="mail-message-icon is-accent"><ShieldCheck size={18} /></span>
								<div>
									<h1>Confirm your email address</h1>
									<p>Parkour Arena &lt;no-reply@parkour.arena&gt; · 09:42</p>
								</div>
							</header>

							<div className="mail-message-body">
								<p>Hi {displayName},</p>
								<p>
									Thanks for signing up. Confirm <strong>{email}</strong> to
									activate your player and keep your progress tied to this
									account.
								</p>

								{status === "done" ? (
									<div className="mail-verified">
										<div className="mail-verified-icon"><Check size={20} /></div>
										<div>
											<strong>Email confirmed</strong>
											<p>Your account is active. You can sign in now.</p>
										</div>
										<button className="mail-cta" onClick={() => router.push("/login")}>
											Continue <ArrowRight size={15} />
										</button>
									</div>
								) : (
									<button className="mail-cta" onClick={verify} disabled={status === "loading"}>
										{status === "loading" ? <Loader2 size={16} className="mail-spin" /> : <Mail size={16} />}
										{status === "loading" ? "Confirming" : "Verify email address"}
									</button>
								)}

								<p className="mail-fineprint">
									Button not working? Paste this link into your browser:
									<br />
									<code>https://localhost:4443/api/auth/verify-email?token=…&amp;user_id=…</code>
								</p>
								<p className="mail-signoff">
									If you did not create a Parkour Arena account, ignore this
									message.
								</p>
							</div>
						</div>
					)}
				</section>
			</div>
		</main>
	);
}

export default function DemoMailPage() {
	return (
		<Suspense fallback={<div className="mail-loading">Loading inbox…</div>}>
			<MailInbox />
		</Suspense>
	);
}
