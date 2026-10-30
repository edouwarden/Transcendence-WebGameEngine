"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Settings2 } from "lucide-react";
import Options from "@/components/cards/options";
import { api } from "@/lib/api";
import "./navbar.css";

export const Navbar = ({ OptionsOpen, setOptionsOpen, active = "lobby" }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [username, setUserName] = useState("");
	const [img, setImg] = useState(null);
	const [leaving, setLeaving] = useState(false);
	const router = useRouter();
	const menuRef = useRef(null);

	useEffect(() => {
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("auth_token="))
			?.split("=")[1];
		if (token) {
			try {
				const decoded = JSON.parse(atob(token.split(".")[1]));
				api.get("/api/users/" + decoded.sub)
					.then((data) => setUserName(data[0]?.username || "Player"))
					.catch(console.error);
			} catch {
				setUserName("Player");
			}
		}
		api.getBlob("/api/users/me/profile-picture")
			.then((blob) => blob && setImg(URL.createObjectURL(blob)))
			.catch(() => setImg(null));
	}, []);

	useEffect(() => {
		function onClick(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", onClick);
		return () => document.removeEventListener("mousedown", onClick);
	}, []);

	function signOut() {
		setLeaving(true);
		document.cookie = "auth_token=; Max-Age=0; path=/";
		router.push("/login");
	}

	const initials = (username || "P").slice(0, 2).toUpperCase();

	return (
		<>
			<header className="app-nav">
				<a className="nav-brand" href="/home" aria-label="Parkour Arena home">
					<span className="nav-brand-mark" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none">
							<path d="M4 19 12 5l8 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M8 19h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
						</svg>
					</span>
					<span className="nav-brand-copy">
						<strong>Parkour Arena</strong>
						<span>transendance</span>
					</span>
				</a>

				<nav className="nav-links" aria-label="Primary">
					<a href="/home" className={active === "lobby" ? "is-active" : ""}>Lobby</a>
					<a href="/rules" className={active === "rules" ? "is-active" : ""}>How to play</a>
				</nav>

				<div className="nav-right">
					<span className="nav-status"><span /> Lobby open</span>
					<div className="nav-user" ref={menuRef}>
						<button
							className="nav-user-btn"
							onClick={() => setDropdownOpen((open) => !open)}
							aria-expanded={dropdownOpen}
						>
							{img ? (
								<img src={img} alt="" className="nav-avatar" />
							) : (
								<span className="nav-avatar">{initials}</span>
							)}
							<span className="nav-user-copy">
								<strong>{username || "Player"}</strong>
								<span>Rookie</span>
							</span>
							<ChevronDown size={14} className={dropdownOpen ? "is-open" : ""} />
						</button>

						{dropdownOpen && (
							<div className="nav-menu" role="menu">
								<button
									role="menuitem"
									onClick={() => {
										setDropdownOpen(false);
										setOptionsOpen?.(true);
									}}
								>
									<Settings2 size={15} /> Settings
								</button>
								<div className="nav-menu-sep" />
								<button role="menuitem" className="is-danger" onClick={signOut} disabled={leaving}>
									<LogOut size={15} /> {leaving ? "Signing out…" : "Sign out"}
								</button>
							</div>
						)}
					</div>
				</div>
			</header>

			{OptionsOpen && (
				<div className="modal-overlay backdrop-blur-sm" onClick={() => setOptionsOpen(false)}>
					<div onClick={(event) => event.stopPropagation()}>
						<Options OptionsOpen={OptionsOpen} setOptionsOpen={setOptionsOpen} />
					</div>
				</div>
			)}
		</>
	);
};
