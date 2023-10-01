import React, { useEffect, useState } from "react";
import RTScoreBar from "./RTScoreBar";
import Multi from "./Assets/Multiplayer.png";
import Robot from "./Assets/Robot.png";
import Rock from "./Assets/Rock.png";
import Lizard from "./Assets/Lizard.png";
import Paper from "./Assets/Paper.png";
import Scissors from "./Assets/Scissors.png";
import Spock from "./Assets/Spock.png";
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase-config"; 
import { rounds } from "./Slider";
import PlayAgain from "./PlayAgain";

var usrscore = 0;
var compscore = 0;

export const RTScore = ({ room }) => {
  const [choice, setChoice] = useState("");
  const [cchoice, setCChoice] = useState(null);
  const choiceRef = collection(db, "commands");

  useEffect(() => {
    const queryChoice = query(choiceRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryChoice, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const cchoice = data.number;
        setCChoice(cchoice);
        if (
          (choice === 1 && cchoice === 4) ||
          (choice === 3 && cchoice === 1) ||
          (choice === 1 && cchoice === 2) ||
          (choice === 5 && cchoice === 1) ||
          (choice === 2 && cchoice === 5) ||
          (choice === 4 && cchoice === 5) ||
          (choice === 5 && cchoice === 3) ||
          (choice === 2 && cchoice === 4) ||
          (choice === 3 && cchoice === 2) ||
          (choice === 4 && cchoice === 3)
        ) {
          usrscore = usrscore + 1;
        } else if (
          (cchoice === 1 && choice === 4) ||
          (cchoice === 3 && choice === 1) ||
          (cchoice === 1 && choice === 2) ||
          (cchoice === 5 && choice === 1) ||
          (cchoice === 2 && choice === 5) ||
          (cchoice === 4 && choice === 5) ||
          (cchoice === 5 && choice === 3) ||
          (cchoice === 2 && choice === 4) ||
          (cchoice === 3 && choice === 2) ||
          (cchoice === 4 && choice === 3)
        ) {
          compscore = compscore + 1;
        } else if (cchoice === choice) {
          compscore = compscore + 0.5;
          usrscore = usrscore + 0.5;
        }
      });
    });
    return () => unsubscribe();
  }, [choice, choiceRef, room]);

  const handleSubmit = async (e) => {
    if (choice === "") return;
    await addDoc(choiceRef, {
      number: choice,
      room,
    });

    setChoice("");
  };

  var zee;
  if (choice === 1) zee = Spock;
  else if (choice === 2) zee = Rock;
  else if (choice === 3) zee = Paper;
  else if (choice === 4) zee = Scissors;
  else zee = Lizard;

  var wee;
  if (cchoice === 1) wee = Spock;
  else if (cchoice === 2) wee = Rock;
  else if (cchoice === 3) wee = Paper;
  else if (cchoice === 4) wee = Scissors;
  else if (cchoice === 5) wee = Lizard;

  if (compscore + usrscore === rounds) {
    if (compscore > usrscore) {
      return (
        <div>
          <h1>You Lose!! Hehe Loser!</h1>
          <PlayAgain />
        </div>
      );
    } else if (usrscore > compscore) {
      return (
        <div>
          <h1>Yeah you won. As if it matters.</h1>
          <PlayAgain />
        </div>
      );
    } else {
      return (
        <div>
          <h1>It's a tie. You and your computer, both losers.</h1>
          <PlayAgain />
        </div>
      );
    }
  }

  return (
    <div>
      <h1> Welcome to: {room.toUpperCase()}</h1>
      <div className="scorebox">
        <img className="Robo" src={Robot} alt="Robot"></img>
        <div className="userscore">
          <h2>{usrscore}</h2>
        </div>
        <h2 className="vs">vs</h2>
        <div className="score">
          <h2>{compscore}</h2>
        </div>
        <img className="Multi" src={Multi} alt="Icon"></img>
      </div>
      <div className="user">
        <button
          className="one"
          onClick={() => {
            setChoice(1);
            handleSubmit();
          }}
        >
          <img className="ione" src={Spock} alt="Spock"></img>
        </button>
        <button
          className="two"
          onClick={() => {
            setChoice(2);
            handleSubmit();
          }}
        >
          <img className="itwo" src={Rock} alt="Rock"></img>
        </button>
        <button
          className="three"
          onClick={() => {
            setChoice(3);
            handleSubmit();
          }}
        >
          <img className="ithree" src={Paper} alt="Paper"></img>
        </button>
        <button
          className="four"
          onClick={() => {
            setChoice(4);
            handleSubmit();
          }}
        >
          <img className="ifour" src={Scissors} alt="Scissors"></img>
        </button>
        <button
          className="five"
          onClick={() => {
            setChoice(5);
            handleSubmit();
          }}
        >
          <img className="ifive" src={Lizard} alt="Lizard"></img>
        </button>
        <img className="usrchoice" src={zee} alt="Choice"></img>
      </div>
      <div className="user">
        <img className="compchoice" src={wee} alt="Choice"></img>
        <button className="cone">
          <img className="icone" src={Spock} alt="Spock"></img>
        </button>
        <button className="ctwo">
          <img className="ictwo" src={Rock} alt="Rock"></img>
        </button>
        <button className="cthree">
          <img className="icthree" src={Paper} alt="Paper"></img>
        </button>
        <button className="cfour">
          <img className="icfour" src={Scissors} alt="Scissors"></img>
        </button>
        <button className="cfive">
          <img className="icfive" src={Lizard} alt="Lizard"></img>
        </button>
      </div>
    </div>
  );
};

export default RTScore;
