"use client";

import { useEffect, useState } from "react";
import { Keyboard as KeyboardIcon, RotateCcw, X } from "lucide-react";

const STORAGE_KEY = "transequipe.keybindings";
const DEFAULT_BINDINGS = {
	forward: "KeyW",
	backward: "KeyS",
	left: "KeyA",
	right: "KeyD",
	space: "Space",
	shift: "ShiftLeft",
};

const LABELS = {
	forward: "Forward",
	backward: "Backward",
	left: "Left",
	right: "Right",
	space: "Jump",
	shift: "Sprint",
};

function codeToLabel(code) {
	if (!code) return "?";
	if (code.startsWith("Key")) return code.slice(3).toUpperCase();
	if (code.startsWith("Digit")) return code.slice(5);
	if (code === "Space") return "Space";
	if (code === "ShiftLeft" || code === "ShiftRight") return "Shift";
	if (code === "ControlLeft" || code === "ControlRight") return "Ctrl";
	return code;
}

export function Keyboard({ setKeyboardOpen }) {
	const [bindings, setBindings] = useState(DEFAULT_BINDINGS);
	const [listeningAction, setListeningAction] = useState(null);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setBindings((prev) => ({ ...prev, ...JSON.parse(raw) }));
		} catch {}
	}, []);

	useEffect(() => {
		if (!listeningAction) return;
		const onKeyDown = (event) => {
			event.preventDefault();
			setBindings((prev) => ({ ...prev, [listeningAction]: event.code }));
			setListeningAction(null);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [listeningAction]);

	const saveAndClose = () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(bindings));
		setKeyboardOpen(false);
	};

	return (
		<div className="modal-overlay" onClick={() => setKeyboardOpen(false)}>
			<div className="app-modal app-modal--sm" onClick={(event) => event.stopPropagation()}>
				<header className="app-modal-head">
					<div className="app-modal-title">
						<KeyboardIcon size={16} />
						<h2>
							Keyboard
							<span className="app-modal-sub">Click a binding, then press a key</span>
						</h2>
					</div>
					<button className="app-modal-close" onClick={() => setKeyboardOpen(false)} aria-label="Close keyboard settings">
						<X size={15} />
					</button>
				</header>

				<div className="app-modal-body">
					<div className="app-keybinds">
						{Object.keys(DEFAULT_BINDINGS).map((action) => (
							<div className="app-keybind-row" key={action}>
								<span>{LABELS[action]}</span>
								<button
									className={`app-keybind ${listeningAction === action ? "is-listening" : ""}`}
									onClick={() => setListeningAction(action)}
								>
									{listeningAction === action ? "Press a key…" : codeToLabel(bindings[action])}
								</button>
							</div>
						))}
					</div>
					<p className="app-hint" style={{ marginTop: 14, marginBottom: 0 }}>
						Bindings are stored in this browser only.
					</p>
				</div>

				<footer className="app-modal-foot">
					<button
						className="app-btn"
						onClick={() => {
							setBindings(DEFAULT_BINDINGS);
							localStorage.removeItem(STORAGE_KEY);
						}}
					>
						<RotateCcw size={14} /> Reset
					</button>
					<span style={{ flex: 1 }} />
					<button className="app-btn" onClick={() => setKeyboardOpen(false)}>
						Cancel
					</button>
					<button className="app-btn app-btn--primary" onClick={saveAndClose}>
						Save
					</button>
				</footer>
			</div>
		</div>
	);
}
