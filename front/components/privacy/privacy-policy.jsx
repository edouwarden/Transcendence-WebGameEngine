"use client";

import { X } from "lucide-react";

export function PrivacyPolicy({ setPrivacyPolicyOpen }) {
	return (
		<div className="modal-overlay" onClick={() => setPrivacyPolicyOpen(false)}>
			<div className="app-modal app-modal--lg" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<h2>
							Privacy policy
							<span className="app-modal-sub">Last updated October 2026</span>
						</h2>
					</div>
					<button className="app-modal-close" onClick={() => setPrivacyPolicyOpen(false)} aria-label="Close privacy policy">
						<X size={15} />
					</button>
				</header>

				<div className="app-modal-body">
					<div className="app-doc">
						<section>
							<h3>1. Introduction</h3>
							<p>
								Parkour Arena is committed to protecting your personal data.
								This policy explains what we collect, how we use it, and what
								rights you have over your information.
							</p>
						</section>
						<section>
							<h3>2. Data we collect</h3>
							<ul>
								<li>Account data: username, email address, encrypted password.</li>
								<li>Game data: progress, scores, statistics and playtime.</li>
								<li>Technical data: device type, operating system, session identifier and IP address.</li>
								<li>Communication data: in-game chat messages and support requests.</li>
							</ul>
						</section>
						<section>
							<h3>3. How we use your data</h3>
							<ul>
								<li>Enable leaderboards and multiplayer features.</li>
								<li>Prevent cheating, abuse and fraudulent activity.</li>
								<li>Run anonymised statistical analysis to improve gameplay and performance.</li>
							</ul>
						</section>
						<section>
							<h3>4. Data sharing</h3>
							<p>
								We do not sell your personal data. It may be shared with
								technical service providers such as hosting and anti-cheat
								systems, or with authorities when required by law.
							</p>
						</section>
						<section>
							<h3>5. Cookies and similar technologies</h3>
							<p>
								The site may use cookies to keep your session active, remember
								preferences and measure audience traffic.
							</p>
						</section>
						<section>
							<h3>6. Data retention</h3>
							<p>
								Account data is kept while your account is active, then deleted
								within 30 days of a deletion request. Anonymised game
								statistics may be retained for analytical purposes.
							</p>
						</section>
						<section>
							<h3>7. Your rights (GDPR)</h3>
							<ul>
								<li>Access, correct or delete your personal data.</li>
								<li>Object to processing and request data portability.</li>
								<li>Withdraw consent at any time.</li>
								<li>Lodge a complaint with your local data protection authority.</li>
							</ul>
						</section>
						<section>
							<h3>8. Data security</h3>
							<p>
								We apply encryption, access controls and regular audits to
								protect your data. No system is entirely immune to risk, so
								absolute security cannot be guaranteed.
							</p>
						</section>
						<section>
							<h3>9. Changes to this policy</h3>
							<p>
								We may update this policy from time to time. Significant changes
								are announced by email or in-game, and the latest revision date
								is always shown above.
							</p>
						</section>
						<section>
							<h3>10. Contact</h3>
							<p>Questions about this policy: contact@parkour-arena.example</p>
						</section>
					</div>
				</div>

				<footer className="app-modal-foot">
					<button className="app-btn" onClick={() => setPrivacyPolicyOpen(false)}>
						Go back
					</button>
				</footer>
			</div>
		</div>
	);
}
