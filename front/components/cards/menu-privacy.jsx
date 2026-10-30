"use client";

import { useState } from "react";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { PrivacyPolicy } from "@/components/privacy/privacy-policy.jsx";
import { Terms } from "@/components/privacy/terms.jsx";

export default function MenuPrivacy({ setPrivacyOpen }) {
	const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
	const [termsOpen, setTermsOpen] = useState(false);

	return (
		<>
			<nav className="app-menu-list" aria-label="Legal">
				<button className="app-menu-row" onClick={() => setPrivacyPolicyOpen(true)}>
					<ShieldCheck size={15} />
					<span>Privacy policy</span>
				</button>
				<button className="app-menu-row" onClick={() => setTermsOpen(true)}>
					<FileText size={15} />
					<span>Terms of service</span>
				</button>
				<div style={{ height: 1, margin: "4px 6px", background: "rgba(255,255,255,.07)" }} />
				<button className="app-menu-row" onClick={() => setPrivacyOpen(false)}>
					<ArrowLeft size={15} />
					<span>Go back</span>
				</button>
			</nav>

			{privacyPolicyOpen && <PrivacyPolicy setPrivacyPolicyOpen={setPrivacyPolicyOpen} />}
			{termsOpen && <Terms setTermsOpen={setTermsOpen} />}
		</>
	);
}
