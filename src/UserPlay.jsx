import React, { useState, useRef } from "react";
import {
  addDoc,
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase-config";
import RTScore from "./RTScoreBar";

function UserGame() {
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const playerNameInputRef = useRef(null);
  const rounds = useRef(null); // Add the rounds ref

  const enterGame = () => {
    const enteredRoom = roomInputRef.current.value;
    setRoom(enteredRoom);
  };

  const generateRoomId = () => {
    // Generate a random alphanumeric code
    const characters = "0123456789";
    let code = "";
    const codeLength = 6;

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    return code;
  };

  const createRoom = async () => {
    const roomId = generateRoomId();
    const playerName = playerNameInputRef.current.value;
    const numberOfRounds = parseInt(rounds.current.value);
    const timestamp = new Date();
  
    const roomCollection = collection(db, "rooms");
    await addDoc(roomCollection, {
      roomId,
      players: [{ name1: playerName }],
      numberOfRounds,
      scores: [],
      createdAt: timestamp,
    });
  
    setRoom(roomId);
  };
  

  const joinRoom = async () => {
    const enteredRoom = roomInputRef.current.value;
    const playerName = playerNameInputRef.current.value;
    const numberOfRounds = parseInt(rounds.current.value);
  
    const roomCollection = collection(db, "rooms");
    const roomQuery = query(roomCollection, where("roomId", "==", enteredRoom));
    const roomSnapshot = await getDocs(roomQuery);
  
    if (roomSnapshot.empty) {
      // Room doesn't exist
      alert("Room does not exist. Please enter a valid room ID.");
    } else {
      const roomData = roomSnapshot.docs[0].data();
      const players = roomData.players;
  
      if (players.length >= 2) {
        // Room is full
        alert("Room is already full. Please join another room.");
      } else {
        setRoom(enteredRoom);
  
        // Add the player to the room's players array along with the player name
        const roomId = roomSnapshot.docs[0].id;
        const roomRef = doc(db, "rooms", roomId);
        await updateDoc(roomRef, {
          players: [...players, { name2: playerName }],
          numberOfRounds,
          scores: new Array(numberOfRounds).fill(0),
        });
      }
    }
  };
  

  return (
    <div>
      {room ? (
        <div>
          <RTScore room={room} />
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-4">
              <label>Enter room name:</label>
            </div>
            <div className="col-3">
              <input ref={roomInputRef} />
              <button className="btn btn-primary" onClick={enterGame}>
                Join Game
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label>Enter your name:</label>
            </div>
            <div className="col-3">
              <input ref={playerNameInputRef} />{" "}
              {/* Add the player name input field */}
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label>Enter number of rounds:</label>
            </div>
            <div className="col-3">
              <input ref={rounds} type="number" />{" "}
              {/* Add the number of rounds */}
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label>Create room:</label>
            </div>
            <div className="col-2">
              <button className="btn btn-primary" onClick={createRoom}>
                Create Room
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserGame;
