"use client";
import { Button } from "../../app/animations/button.jsx";
import { useState, useEffect} from "react";
import { api } from "@/lib/api";
export default function FriendList(props) {

  const [players, setPlayers] = useState([])
  const [friends, setFriends] = useState([])
  const [Img, setImg] = useState([])
  const [Added, setAdded] = useState({})
  const [UserName,setUserName] = useState("")
  const [Requests,setRequests] = useState([])
  const [SentRequests,setSentRequests] = useState([])
  const [deleted, setDeleted] = useState(false)
  const [Requested, setRequested] = useState(false)

  
    async function fetchUsers() {
  try {
    const data = await api.get('/api/users');
    setPlayers(data)
  } catch (error) {

  }
}
  async function fetchSendRequest(id) {
  try {
    await api.post('/api/friends/request', { friend_id: id });
  } catch (error) {

  }
}

  async function fetchDelete(id) {
  try {
    await api.delete('/api/friends/delete', { friend_id: id });
      setDeleted(!deleted)
      // setAdded([])
  } catch (error) {

  }
}

  async function fetchFriends() {
  try {
    const data = await api.get('/api/friends/friendlist');
    setPlayers(data)
  } catch (error) {

  }
}

  async function findPendingRequests(){
  try {
    const data = await api.get('/api/friends/pending');
    setRequests(data)
  } catch (error) {

  }
}

  async function findSentRequests(){
  try {
    const data = await api.get('/api/friends/sent');
    setSentRequests(data)
  } catch (error) {

  }
}

  async function loadFriends() {
  try {
    const data = await api.get('/api/friends/friendlist');
    setFriends(data)
  } catch (error) {

  }
}

useEffect(() => {
  if (props.FriendsDisplay) {
    const refreshFriendsView = () => {
      fetchFriends();
      findPendingRequests();
    };

    refreshFriendsView();
    const friendsIntervalId = setInterval(refreshFriendsView, 5000);

    return () => clearInterval(friendsIntervalId);
  }

  const refreshAddablePlayers = () => {
    fetchUsers();
    loadFriends();
    findPendingRequests();
    findSentRequests();
  };

  refreshAddablePlayers();
  const addablePlayersIntervalId = setInterval(refreshAddablePlayers, 3000);

  return () => clearInterval(addablePlayersIntervalId);
}, [props.FriendsDisplay, deleted]);
  return (
    <ul className="app-list">
      {(Array.isArray(players) ? players : [])
        .filter((player) =>
          props.FriendsDisplay
            ? player.username !== UserName
            : player.username !== UserName && !friends.some((friend) => friend.id === player.id) 
            && !Requests.some((request) => request.id === player.id)
        )
        .map((player) => {
          const isPending = SentRequests.some((req) => req.id === player.id) || Added[player.id];
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
                <span>{isPending ? "Request sent" : props.FriendsDisplay ? "Friend" : "Available to add"}</span>
              </span>
              {!props.FriendsDisplay && (
                <button
                  className={`app-row-action ${isPending ? "" : "is-primary"}`}
                  disabled={isPending}
                  onClick={() => {
                    if (!isPending) {
                      setAdded((prev) => ({ ...prev, [player.id]: true }));
                      fetchSendRequest(player.id);
                    }
                  }}
                >
                  {isPending ? "Pending" : "Add"}
                </button>
              )}
              {props.FriendsDisplay && (
                <button className="app-row-action" onClick={() => fetchDelete(player.id)}>
                  Remove
                </button>
              )}
            </li>
          );
        })}
      {(!Array.isArray(players) || players.length === 0) && (
        <li className="app-empty">
          <strong>No players yet</strong>
          <span>Invite someone to the lobby to start a friends list.</span>
        </li>
      )}
    </ul>
  );
}
