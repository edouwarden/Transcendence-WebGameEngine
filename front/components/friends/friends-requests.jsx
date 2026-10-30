"use client";

import { ArrowLeft, UserPlus, X } from "lucide-react";
import FriendsRequestsList from "@/components/friends/friends-requests-list.jsx";

export default function FriendsRequests({ setFriendsRequestsOpen }) {
	return (
		<div className="modal-overlay" onClick={() => setFriendsRequestsOpen(false)}>
			<div className="app-modal app-modal--sm" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<UserPlus size={16} />
						<h2>
							Friend requests
							<span className="app-modal-sub">Accept to race together</span>
						</h2>
					</div>
					<button className="app-modal-close" onClick={() => setFriendsRequestsOpen(false)} aria-label="Close requests">
						<X size={15} />
					</button>
				</header>

				<div className="app-modal-body app-modal-body--flush">
					<FriendsRequestsList setFriendsRequestsOpen={setFriendsRequestsOpen} />
				</div>

				<footer className="app-modal-foot">
					<button className="app-btn" onClick={() => setFriendsRequestsOpen(false)}>
						<ArrowLeft size={14} /> Go back
					</button>
				</footer>
			</div>
		</div>
	);
}
