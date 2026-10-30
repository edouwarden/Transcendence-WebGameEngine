"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Trash2, UserRound, X } from "lucide-react";
import { api } from "@/lib/api";

export function Profile({ SetProfileOpen }) {
	const [profile, setProfile] = useState({ email: "", password: ".........", username: "" });
	const [initialProfile, setInitialProfile] = useState({ email: "", password: ".........", username: "" });
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const [decoded, setDecoded] = useState("");
	const inputRef = useRef(null);
	const router = useRouter();

	useEffect(() => {
		const token = document.cookie
			.split("; ")
			.find((row) => row.startsWith("auth_token="))
			?.split("=")[1];
		if (!token) return;
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			setDecoded(payload.sub);
			api.get("/api/users/" + payload.sub)
				.then((data) => {
					const user = Array.isArray(data) ? data[0] : data;
					if (!user) return;
					const next = {
						email: user.email || "",
						password: ".........",
						username: user.username || "",
					};
					setProfile(next);
					setInitialProfile(next);
				})
				.catch(console.error);
		} catch {
			setError("Could not read your session.");
		}
	}, []);

	async function uploadPicture(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		setAvatar(URL.createObjectURL(file));
		const form = new FormData();
		form.append("file", file);
		try {
			await api.put("/api/update/profile-picture", form);
		} catch (uploadError) {
			console.error(uploadError);
			setError("Could not upload that image.");
		}
	}

	async function handleSave() {
		setSaving(true);
		setError("");
		const payload =
			profile.password === initialProfile.password
				? { username: profile.username, email: profile.email }
				: { ...profile };
		try {
			await api.patch("/api/users/" + decoded, payload);
			SetProfileOpen(false);
		} catch (saveError) {
			console.log(saveError);
			setError("Those details could not be saved. Try another username or email.");
		} finally {
			setSaving(false);
		}
	}

	async function handleDelete() {
		if (!window.confirm("Delete your account permanently? This cannot be undone.")) return;
		try {
			await api.delete("/api/users/delete?user_id=" + decoded);
			SetProfileOpen(false);
			router.push("/login");
		} catch (deleteError) {
			console.error(deleteError);
			setError("Could not delete the account.");
		}
	}

	const initials = (profile.username || "P").slice(0, 2).toUpperCase();

	return (
		<div className="modal-overlay" onClick={() => SetProfileOpen(false)}>
			<div className="app-modal" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<UserRound size={16} />
						<h2>
							Your profile
							<span className="app-modal-sub">Account details and avatar</span>
						</h2>
					</div>
					<button className="app-modal-close" onClick={() => SetProfileOpen(false)} aria-label="Close profile">
						<X size={15} />
					</button>
				</header>

				<div className="app-modal-body">
					<div className="profile-identity">
						{avatar ? (
							<img src={avatar} alt="" className="profile-avatar" />
						) : (
							<span className="profile-avatar">{initials}</span>
						)}
						<div>
							<strong>{profile.username || "Player"}</strong>
							<span>Skin colour is managed from the lobby stage.</span>
							<button className="app-btn" onClick={() => inputRef.current?.click()}>
								<Camera size={14} /> Change avatar
							</button>
							<input ref={inputRef} type="file" accept="image/*" hidden onChange={uploadPicture} />
						</div>
					</div>

					{error && <p className="app-error">{error}</p>}

					<div className="app-form">
						<div className="app-field">
							<label htmlFor="profile-username">Username</label>
							<input
								id="profile-username"
								className="app-input"
								value={profile.username}
								onChange={(event) => setProfile({ ...profile, username: event.target.value })}
							/>
						</div>
						<div className="app-field">
							<label htmlFor="profile-email">Email</label>
							<input
								id="profile-email"
								type="email"
								className="app-input"
								value={profile.email}
								onChange={(event) => setProfile({ ...profile, email: event.target.value })}
							/>
						</div>
						<div className="app-field">
							<label htmlFor="profile-password">Password</label>
							<input
								id="profile-password"
								type="password"
								className="app-input"
								value={profile.password}
								onChange={(event) => setProfile({ ...profile, password: event.target.value })}
							/>
						</div>
					</div>

					<div className="profile-danger">
						<div>
							<strong>Delete account</strong>
							<span>Removes your player, stats and chat history.</span>
						</div>
						<button className="app-btn app-btn--danger" onClick={handleDelete}>
							<Trash2 size={14} /> Delete
						</button>
					</div>
				</div>

				<footer className="app-modal-foot">
					<button className="app-btn" onClick={() => SetProfileOpen(false)}>
						Cancel
					</button>
					<button className="app-btn app-btn--primary" onClick={handleSave} disabled={saving}>
						{saving ? "Saving…" : "Save changes"}
					</button>
				</footer>
			</div>
		</div>
	);
}
