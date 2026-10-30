"use client";
import { Button } from "../../app/animations/button.jsx";
import { useState, useEffect} from "react";
import { api } from "@/lib/api";
export default function FriendsRequestsList(props) {
  // const players = [
  //   {  name: "Tania Andrew", img: "https://docs.material-tailwind.com/img/face-1.jpg", win: 20 },
  //   {  name: "Alexander", img: "https://docs.material-tailwind.com/img/face-2.jpg", win: 18 },
  //   {  name: "Emma Willever", img: "https://docs.material-tailwind.com/img/face-3.jpg", win: 15 },
  //   { name: "Candice", img: "https://docs.material-tailwind.com/img/face-1.jpg", win: 10 },
  //   { name: "John Doe", img: "https://randomuser.me/api/portraits/men/1.jpg", win: 9 },
  //   { name: "Jane Smith", img: "https://randomuser.me/api/portraits/women/2.jpg", win: 8 },
  //   { name: "Lucas", img: "https://randomuser.me/api/portraits/men/3.jpg", win: 7 },
  //   { name: "Sophie", img: "https://randomuser.me/api/portraits/women/4.jpg", win: 6 },
  // ];

  const [Requests, setRequests] = useState([])
  const [Img, setImg] = useState([])
  const [Added, setAdded] = useState([])
  const [UserName,setUserName] = useState("")
  const [FriendsClick,setFriendsClick] = useState(false)

  function handleAdd(idx) {
    setAdded((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  }
  
  async function fetchFriends() {
  try {
    const data = await api.get('/api/friends/pending');
    setRequests(data)
  } catch (error) {
    // console.error(error);
  }
}

async function fetchAccept(id) {
  try {
    await api.patch('/api/friends/accept', { friend_id: id });
    setFriendsClick(!FriendsClick)
  } catch (error) {
    // console.error(error);
  }
}

async function fetchDecline(id) {
  try {
    await api.delete('/api/friends/reject', { friend_id: id });
    setFriendsClick(!FriendsClick)
  } catch (error) {
    // console.error(error);
  }
}

// function getCookie(name) {
//   return document.cookie
//     .split('; ')
//     .find(row => row.startsWith(name + '='))
//     ?.split('=')[1];
// }

// useEffect(() => {
//   const token = getCookie('auth_token');
//   if (!token) return;

//   const payload = token.split('.')[1];
//   const decoded = JSON.parse(atob(payload));
//   fetchData(decoded.sub);
// }, []);

useEffect(() => {
  fetchFriends();
  const pendingRequestsIntervalId = setInterval(fetchFriends, 5000);

  return () => clearInterval(pendingRequestsIntervalId);
}, [FriendsClick]);

  return (
    <ul className="app-list">
      {Array.isArray(Requests) && Requests.map((player) => {
        const initials = (player.username || "?").slice(0, 2).toUpperCase();
        return (
          <li className="app-list-row" key={player.id}>
            <span
              className="app-avatar"
              style={
                player.skin_color
                  ? {
                      background: `${player.skin_color}1f`,
                      borderColor: `${player.skin_color}55`,
                      color: player.skin_color,
                    }
                  : undefined
              }
            >
              {initials}
            </span>
            <span className="app-list-copy">
              <strong>{player.username}</strong>
              <span>Wants to be your friend</span>
            </span>
            <span className="app-request-actions">
              <button className="app-row-action is-primary" onClick={() => fetchAccept(player.id)}>
                Accept
              </button>
              <button className="app-row-action" onClick={() => fetchDecline(player.id)}>
                Decline
              </button>
            </span>
          </li>
        );
      })}
      {(!Array.isArray(Requests) || Requests.length === 0) && (
        <li className="app-empty">
          <strong>No pending requests</strong>
          <span>New friend requests will show up here.</span>
        </li>
      )}
    </ul>
  );
}
