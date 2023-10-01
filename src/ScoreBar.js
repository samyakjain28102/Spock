// import { MyComponent } from "./framermotion";
import Multi from "./Assets/Multiplayer.png";
import Robot from "./Assets/Robot.png";
import Rock from "./Assets/Rock.png";
import Lizard from "./Assets/Lizard.png";
import Paper from "./Assets/Paper.png";
import Scissors from "./Assets/Scissors.png";
import Spock from "./Assets/Spock.png";
import { useState } from "react";
import { user, oppo } from "./App";
import { rounds } from "./Slider";
import Playagain from "./PlayAgain";
import CountdownTimer from "./CountdownTimer";

var usrscore = 0;
var compscore = 0;

function Score() {
  const [choice, setChoice] = useState("");
  const [autoSelected, setAutoSelected] = useState(false);
  // var pic;
  // pic=choice;
  // function Reset(){
  //     return(
  //         setChoice(0)
  //     );
  // }
  var zee;
  if (choice === 1) zee = Spock;
  else if (choice === 2) zee = Rock;
  else if (choice === 3) zee = Paper;
  else if (choice === 4) zee = Scissors;
  else zee = Lizard;

  // const sendChoiceToFirebase = (choice) => {
  //   // Push the choice number to the Firebase database
  //   database.ref('choices').push(choice);
  // };

  //computer functionality
  var cchoice = Math.floor(Math.random() * 5) + 1;
  var wee;
  if (cchoice === 1) wee = Spock;
  else if (cchoice === 2) wee = Rock;
  else if (cchoice === 3) wee = Paper;
  else if (cchoice === 4) wee = Scissors;
  else if (cchoice === 5) wee = Lizard;

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
    // Reset()
  } else if (cchoice === choice) {
    compscore = compscore + 0.5;
    usrscore = usrscore + 0.5;
    // Reset()
  }

  //result
  if (compscore + usrscore === rounds) {
    if (compscore > usrscore) {
      return (
        <div>
          <h1>You Lose!! Hehe Loser!</h1>
          <Playagain />
        </div>
      );
    } else if (usrscore > compscore) {
      return (
        <div>
          <h1>Yeah you won. As if it matters.</h1>
          <Playagain />
        </div>
      );
    } else {
      return (
        <div>
          <h1>It's a tie. You and your computer, both losers.</h1>
          <Playagain />
        </div>
      );
    }
  }

  return (
    <div>
      <div className="scorebox">
        <img className="Robo" src={Robot} alt="Robot"></img>
        <div className="userscore">
          <h2>{user}</h2>
          <h2>{usrscore}</h2>
        </div>
        <h2 className="vs">vs</h2>
        <div className="score">
          <h2>{oppo}</h2>
          <h2>{compscore}</h2>
        </div>
        <img className="Multi" src={Multi} alt="Icon"></img>
      </div>
      <CountdownTimer time={10} />
      <div className="user">
        <button className="one" onClick={() => setChoice(1)}>
          <img className="ione" src={Spock} alt="Spock"></img>
        </button>
        <button className="two" onClick={() => setChoice(2)}>
          <img className="itwo" src={Rock} alt="Rock"></img>
        </button>
        <button className="three" onClick={() => setChoice(3)}>
          <img className="ithree" src={Paper} alt="Paper"></img>
        </button>
        <button className="four" onClick={() => setChoice(4)}>
          <img className="ifour" src={Scissors} alt="Scissors"></img>
        </button>
        <button className="five" onClick={() => setChoice(5)}>
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
}

export default Score;
