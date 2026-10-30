"use client";

import { useState } from "react";
import { ArrowLeft, Trophy, UserRound, Users } from "lucide-react";
import { Profile } from "@/components/dialogs/profile";
import LeaderBoard from "@/components/cards/leaderboard.jsx";
import FriendsPanel from "@/components/friends/friends-panel.jsx";

export default function MenuOptions({ setOptionsOpen }) {
	const [profileOpen, setProfileOpen] = useState(false);
	const [leaderBoardOpen, setLeaderBoardOpen] = useState(false);
	const [yourFriendsOpen, setYourFriendsOpen] = useState(false);

	const options = [
		{ label: "View profile", icon: <UserRound size={15} />, action: () => setProfileOpen(true) },
		{ label: "Leaderboard", icon: <Trophy size={15} />, action: () => setLeaderBoardOpen(true) },
		{ label: "Your friends", icon: <Users size={15} />, action: () => setYourFriendsOpen(true) },
	];

	return (
		<>
			<nav className="app-menu-list" aria-label="Options">
				{options.map((option) => (
					<button key={option.label} className="app-menu-row" onClick={option.action}>
						{option.icon}
						<span>{option.label}</span>
					</button>
				))}
				<div style={{ height: 1, margin: "4px 6px", background: "rgba(255,255,255,.07)" }} />
				<button className="app-menu-row" onClick={() => setOptionsOpen(false)}>
					<ArrowLeft size={15} />
					<span>Go back</span>
				</button>
			</nav>

			{profileOpen && <Profile SetProfileOpen={setProfileOpen} />}
			{leaderBoardOpen && <LeaderBoard setLeaderBoardOpen={setLeaderBoardOpen} />}
			{yourFriendsOpen && <FriendsPanel setYourFriendsOpen={setYourFriendsOpen} />}
		</>
	);
}
