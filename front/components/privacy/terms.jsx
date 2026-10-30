"use client";

import { X } from "lucide-react";

export function Terms({ setTermsOpen }) {
	return (
		<div className="modal-overlay" onClick={() => setTermsOpen(false)}>
			<div className="app-modal app-modal--lg" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<h2>
							Terms of service
							<span className="app-modal-sub">Last updated October 2026</span>
						</h2>
					</div>
					<button className="app-modal-close" onClick={() => setTermsOpen(false)} aria-label="Close terms">
						<X size={15} />
					</button>
				</header>

				<div className="app-modal-body">
					<div className="app-doc">
						<section>
							<h3>1. Service overview</h3>
							<p>
								Parkour Arena is a browser-based multiplayer game published by
								the Parkour Arena team. It lets players compete in real time on
								shared courses.
							</p>
						</section>
						<section>
							<h3>2. Access to the service</h3>
							<p>
								Playing requires an account. You must be at least 13 years old,
								provide accurate information and keep your credentials
								confidential.
							</p>
						</section>
						<section>
							<h3>3. Code of conduct</h3>
							<p>
								Cheating, harassment, hate speech and any attempt to undermine
								the integrity of the game are prohibited. Accounts that break
								these rules may be sanctioned.
							</p>
						</section>
						<section>
							<h3>4. Intellectual property</h3>
							<p>
								The game and all of its content are protected by copyright.
								Reproduction or modification without authorisation is
								prohibited.
							</p>
						</section>
						<section>
							<h3>5. Personal data</h3>
							<p>
								Data is collected to operate the game. You have the right to
								access, correct and delete your data under the conditions
								described in the privacy policy.
							</p>
						</section>
						<section>
							<h3>6. Liability</h3>
							<p>
								The publisher is not liable for bugs, data loss or temporary
								unavailability of the service.
							</p>
						</section>
						<section>
							<h3>7. Sanctions</h3>
							<p>
								Accounts that do not comply with these terms may be suspended or
								deleted.
							</p>
						</section>
						<section>
							<h3>8. Changes to the terms</h3>
							<p>
								These terms may change at any time. Players are informed of
								significant updates in-game or by email.
							</p>
						</section>
						<section>
							<h3>9. Contact</h3>
							<p>Questions or complaints: contact@parkour-arena.example</p>
						</section>
					</div>
				</div>

				<footer className="app-modal-foot">
					<button className="app-btn" onClick={() => setTermsOpen(false)}>
						Go back
					</button>
				</footer>
			</div>
		</div>
	);
}
