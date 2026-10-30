import React from "react";
import styled from "styled-components";
import { ProgressSpinner } from "@/app/animations/progress-spinner";

const Overlay = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;
	pointer-events: none;
	background: rgba(3, 6, 13, 0.42);
	backdrop-filter: blur(6px);
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 18px;
	width: min(360px, calc(100vw - 40px));
	padding: 30px 28px 26px;
	border-radius: 18px;
	border: 1px solid rgba(255, 255, 255, 0.09);
	background: linear-gradient(180deg, rgba(17, 26, 45, 0.94), rgba(9, 15, 28, 0.96));
	box-shadow: 0 34px 90px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05);
	font-family: var(--font-geist-sans), system-ui, sans-serif;
`;

const Mark = styled.div`
	width: 46px;
	height: 46px;
	display: grid;
	place-items: center;
	border-radius: 13px;
	background: linear-gradient(145deg, #7cf56a, #43c9a5);
	color: #06110a;
	box-shadow: 0 10px 26px rgba(124, 245, 106, 0.2);

	svg {
		width: 24px;
		height: 24px;
	}
`;

const Note = styled.span`
	color: #526078;
	font-size: 9.5px;
	letter-spacing: 0.16em;
	text-transform: uppercase;
`;

interface LoadingUIProps {
	onFinish?: () => void;
}

export const LoadingUI: React.FC<LoadingUIProps> = ({ onFinish }) => {
	return (
		<Overlay>
			<Card>
				<Mark aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none">
						<path d="M4 19 12 5l8 14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M8 19h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
					</svg>
				</Mark>
				<ProgressSpinner onFinish={onFinish} />
				<Note>Building the course · ThreeWrapper</Note>
			</Card>
		</Overlay>
	);
};
