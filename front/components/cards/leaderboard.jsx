"use client";

import { Trophy, X } from "lucide-react";
import LeaderBoardList from "@/components/cards/leaderboard-list.jsx";

const LeaderBoard = ({ setLeaderBoardOpen }) => {
	return (
		<div className="modal-overlay" onClick={() => setLeaderBoardOpen(false)}>
			<div className="app-modal app-modal--sm" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<Trophy size={16} />
						<h2>
							Leaderboard
							<span className="app-modal-sub">Top players by wins</span>
						</h2>
					</div>
					<button className="app-modal-close" onClick={() => setLeaderBoardOpen(false)} aria-label="Close leaderboard">
						<X size={15} />
					</button>
				</header>

				<div className="app-modal-body app-modal-body--flush">
					<LeaderBoardList />
				</div>

				<footer className="app-modal-foot">
					<span style={{ marginRight: "auto", color: "#4f5c72", fontSize: 10.5, letterSpacing: ".04em" }}>
						SEASON 01 · LIVE RANKINGS
					</span>
					<button className="app-btn" onClick={() => setLeaderBoardOpen(false)}>
						Go back
					</button>
				</footer>
			</div>
		</div>
	);
};

export default LeaderBoard;
