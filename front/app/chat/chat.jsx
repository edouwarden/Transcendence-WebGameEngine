"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { api } from "@/lib/api";
import "./chat.css";

function formatTime(value) {
	const date = value ? new Date(value) : new Date();
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const socketRef = useRef(null);
	const scrollRef = useRef(null);

	async function fetchConversationHistory(convId) {
		try {
			const data = await api.get("/api/chat/conversation/" + convId + "/messages");
			setMessages(Array.isArray(data) ? data : []);
		} catch (error) {
			console.log(error);
		}
	}

	async function fetchCurrentUserID() {
		try {
			const data = await api.get("/api/users/me");
			return data[0].id;
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		async function initChat() {
			await fetchCurrentUserID();
			fetchConversationHistory(1);

			const socket = new WebSocket(api.getChatWebSocketUrl("/api/chat/ws"));
			socketRef.current = socket;

			socket.addEventListener("message", (event) => {
				const payload = JSON.parse(event.data);
				setMessages((prev) => {
					if (prev.some((msg) => msg.id === payload.id)) return prev;
					return [payload, ...prev];
				});
			});
		}
		initChat();
		return () => socketRef.current?.close();
	}, []);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	const sendMessage = async () => {
		const socket = socketRef.current;
		if (!socket || socket.readyState !== WebSocket.OPEN) return;
		if (!input.trim()) return;
		socket.send(JSON.stringify({ conversation_id: 1, content: input }));
		setInput("");
	};

	const ordered = [...messages].reverse();

	return (
		<section className="chat-panel" aria-label="Global chat">
			<header className="chat-panel-head">
				<div className="chat-panel-title">
					<MessageSquare size={15} />
					<span>Global chat</span>
				</div>
				<span className="chat-panel-live"><span className="chat-live-dot" /> Live</span>
			</header>

			<div className="chat-panel-messages" ref={scrollRef}>
				{ordered.length === 0 && (
					<div className="chat-empty">
						<MessageSquare size={18} />
						<p>No messages yet.</p>
						<span>Say hello to the lobby.</span>
					</div>
				)}
				{ordered.map((msg) => {
					const senderName = msg.sender_username ?? msg.sender?.username ?? "Unknown";
					return (
						<div className="chat-msg" key={msg.id}>
							<span className="chat-msg-avatar">{senderName.slice(0, 2).toUpperCase()}</span>
							<div className="chat-msg-body">
								<div className="chat-msg-meta">
									<strong>{senderName}</strong>
									<time>{formatTime(msg.created_at)}</time>
								</div>
								<p>{msg.content}</p>
							</div>
						</div>
					);
				})}
				{isLoading && <div className="chat-typing">typing…</div>}
			</div>

			<div className="chat-panel-input">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
					placeholder="Write a message…"
					aria-label="Message"
				/>
				<button onClick={sendMessage} disabled={isLoading || !input.trim()} aria-label="Send message">
					<Send size={15} />
				</button>
			</div>
		</section>
	);
}
