"use client";

import { Navbar } from "../home/navbar.jsx";
import OrientationGuard from "../home/orientation-guard.jsx";
import {
	ArrowRight,
	Crosshair,
	Crown,
	Footprints,
	Gamepad2,
	Keyboard,
	MousePointerClick,
	Skull,
	Sparkles,
	Timer,
	Users,
} from "lucide-react";
import "./rules.css";

const CONTROLS = [
	{ keys: ["W", "A", "S", "D"], label: "Move", detail: "Directional movement" },
	{ keys: ["Space"], label: "Jump", detail: "Clear gaps and ledges" },
	{ keys: ["Shift"], label: "Sprint", detail: "Faster, harder to stop" },
	{ keys: ["Ctrl"], label: "Crouch", detail: "Lower profile, slower" },
	{ keys: ["E"], label: "Interact", detail: "Ready up, use objects" },
	{ keys: ["Esc"], label: "Pause", detail: "Open the pause menu" },
	{ keys: ["1", "–", "6"], label: "Emotes", detail: "Six slots, zero advantage" },
	{ keys: ["F1"], label: "Debug", detail: "Engine panel, dev build" },
];

const STEPS = [
	{
		number: "01",
		icon: <Users size={18} />,
		title: "Ready up in the lobby",
		body: "Everyone in the room presses E. The match starts when the full room is ready — no stragglers, no countdown guesswork.",
		meta: "Quorum 100%",
	},
	{
		number: "02",
		icon: <Timer size={18} />,
		title: "Drop onto the course",
		body: "A short cinematic hands control to you on the starting platform. The course is the same for every player in the match.",
		meta: "Cinematic load",
	},
	{
		number: "03",
		icon: <Crown size={18} />,
		title: "Be the last one standing",
		body: "One life each. A fall or a wipeout eliminates you and drops you into spectator mode. The last player alive wins the match.",
		meta: "One life",
	},
];

export default function RulesPage() {
	return (
		<OrientationGuard>
			<main className="rules-screen">
				<Navbar active="rules" />

				<div className="rules-wrap">
					<header className="rules-hero">
						<span className="rules-kicker">
							<span className="rules-kicker-dot" />
							How to play
						</span>
						<h1>One course. One life. Last one standing.</h1>
						<p>
							Parkour Arena is a browser-native 3D battle royale built on
							ThreeWrapper. Learn the loop in under a minute, then go win a
							round.
						</p>
					</header>

					<section className="rules-objective" aria-label="Objective">
						<div className="objective-icon">
							<Crosshair size={20} />
						</div>
						<div className="objective-copy">
							<h2>Objective</h2>
							<p>
								Reach the end of the course without falling. Every player
								starts with one life, so a single mistake ends your run. You
								can keep moving after elimination and watch the rest of the
								match from the spectator camera.
							</p>
						</div>
						<ul className="objective-facts">
							<li>
								<Footprints size={15} />
								<span>Movement is physics-driven</span>
							</li>
							<li>
								<Skull size={15} />
								<span>Falls eliminate, no respawn</span>
							</li>
							<li>
								<Crown size={15} />
								<span>Last player alive wins</span>
							</li>
						</ul>
					</section>

					<section className="rules-flow" aria-label="Match flow">
						<div className="rules-section-head">
							<h2>Match flow</h2>
							<span>Three phases, one round</span>
						</div>
						<ol className="flow-grid">
							{STEPS.map((step) => (
								<li className="flow-card" key={step.number}>
									<div className="flow-card-top">
										<span className="flow-icon">{step.icon}</span>
										<span className="flow-number">{step.number}</span>
									</div>
									<h3>{step.title}</h3>
									<p>{step.body}</p>
									<span className="flow-meta">{step.meta}</span>
								</li>
							))}
						</ol>
					</section>

					<div className="rules-columns">
						<section className="rules-controls" aria-label="Controls">
							<div className="rules-section-head">
								<h2>
									<Keyboard size={17} /> Controls
								</h2>
								<span>Keyboard and mouse</span>
							</div>
							<ul className="control-grid">
								{CONTROLS.map((control) => (
									<li className="control-row" key={control.label}>
										<span className="key-set">
											{control.keys.map((key) => (
												<kbd key={key}>{key}</kbd>
											))}
										</span>
										<span className="control-copy">
											<strong>{control.label}</strong>
											<span>{control.detail}</span>
										</span>
									</li>
								))}
							</ul>
						</section>

						<aside className="rules-tips" aria-label="Tips">
							<div className="rules-section-head">
								<h2>
									<Sparkles size={17} /> Good to know
								</h2>
							</div>
							<ul className="tips-list">
								<li>
									<span className="tip-icon"><Gamepad2 size={15} /></span>
									<div>
										<strong>Ready state is per room</strong>
										<p>
											Everyone has to press E before the match can begin.
											Leaving the room resets your ready state.
										</p>
									</div>
								</li>
								<li>
									<span className="tip-icon"><MousePointerClick size={15} /></span>
									<div>
										<strong>Your skin follows you</strong>
										<p>
											Body and face colours are saved to your account and
											appear in every match you join.
										</p>
									</div>
								</li>
								<li>
									<span className="tip-icon"><ArrowRight size={15} /></span>
									<div>
										<strong>No download, no launcher</strong>
										<p>
											The game runs in the browser on Three.js. Open the
											lobby, pick a body and play.
										</p>
									</div>
								</li>
							</ul>
						</aside>
					</div>

					<footer className="rules-cta">
						<div>
							<strong>Ready to try it?</strong>
							<span>Sign in, ready up and drop onto the course.</span>
						</div>
						<a href="/online" className="rules-play">
							<Gamepad2 size={16} /> Enter the lobby
						</a>
					</footer>
				</div>
			</main>
		</OrientationGuard>
	);
}
