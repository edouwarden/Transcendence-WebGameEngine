"use client";

import { Settings2, X } from "lucide-react";
import MenuOptions from "@/components/cards/menu-options";

export default function Options({ setOptionsOpen }) {
	return (
		<div className="modal-overlay" onClick={() => setOptionsOpen(false)}>
			<div className="app-modal app-modal--sm" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<Settings2 size={16} />
						<h2>Options</h2>
					</div>
					<button className="app-modal-close" onClick={() => setOptionsOpen(false)} aria-label="Close options">
						<X size={15} />
					</button>
				</header>
				<div className="app-modal-body app-modal-body--flush">
					<MenuOptions setOptionsOpen={setOptionsOpen} />
				</div>
			</div>
		</div>
	);
}
