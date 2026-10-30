"use client";

import { useState } from "react";
import { ArrowLeft, UserPlus, Users, X } from "lucide-react";
import FriendList from "@/components/friends/friends-list.jsx";
import FriendsRequests from "@/components/friends/friends-requests.jsx";

export default function FriendsPanel({ setYourFriendsOpen }) {
	const [friendsDisplay, setFriendsDisplay] = useState(true);
	const [friendsRequestsOpen, setFriendsRequestsOpen] = useState(false);

	return (
		<div className="modal-overlay" onClick={() => setYourFriendsOpen(false)}>
			<div className="app-modal" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<Users size={16} />
						<h2>
							Friends
							<span className="app-modal-sub">
								{friendsDisplay ? "Players you race with" : "Find someone to add"}
							</span>
						</h2>
					</div>
					<button className="app-modal-close" onClick={() => setYourFriendsOpen(false)} aria-label="Close friends">
						<X size={15} />
					</button>
				</header>

				<div className="app-tabs">
					<button
						className={`app-tab ${friendsDisplay ? "is-active" : ""}`}
						onClick={() => setFriendsDisplay(true)}
					>
						Your friends
					</button>
					<button
						className={`app-tab ${!friendsDisplay ? "is-active" : ""}`}
						onClick={() => setFriendsDisplay(false)}
					>
						Add friends
					</button>
				</div>

				<div className="app-modal-body app-modal-body--flush">
					<FriendList FriendsDisplay={friendsDisplay} FriendsRequestsOpen={friendsRequestsOpen} />
				</div>

				<footer className="app-modal-foot">
					<button className="app-btn" onClick={() => setFriendsRequestsOpen(true)}>
						<UserPlus size={14} /> Requests
					</button>
					<span style={{ flex: 1 }} />
					<button
						className="app-btn"
						onClick={() => {
							if (friendsDisplay) setYourFriendsOpen(false);
							else setFriendsDisplay(true);
							setFriendsRequestsOpen(false);
						}}
					>
						<ArrowLeft size={14} /> {friendsDisplay ? "Go back" : "Back to friends"}
					</button>
				</footer>

				{friendsRequestsOpen && <FriendsRequests setFriendsRequestsOpen={setFriendsRequestsOpen} />}
			</div>
		</div>
	);
}
