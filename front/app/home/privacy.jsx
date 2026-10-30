"use client";

import { ShieldCheck, X } from "lucide-react";
import MenuPrivacy from "@/components/cards/menu-privacy";

export default function Privacy({ setPrivacyOpen }) {
	return (
		<div className="modal-overlay" onClick={() => setPrivacyOpen(false)}>
			<div className="app-modal app-modal--sm" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<ShieldCheck size={16} />
						<h2>
							Legal
							<span className="app-modal-sub">Privacy and terms</span>
						</h2>
					</div>
					<button className="app-modal-close" onClick={() => setPrivacyOpen(false)} aria-label="Close legal">
						<X size={15} />
					</button>
				</header>
				<div className="app-modal-body app-modal-body--flush">
					<MenuPrivacy setPrivacyOpen={setPrivacyOpen} />
				</div>
			</div>
		</div>
	);
}
