import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import robo from "./Assets/Robot.png";
import multi from "./Assets/Multiplayer.png";
import Score from "./ScoreBar";
import { useState, useRef } from "react";
import DSlider from "./Slider";
import { motion } from "framer-motion";
import UserGame from "./UserPlay";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

const supervillains = require("supervillains");
var user = "";
var oppo = supervillains.random();

function App() {
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Declare selectedOption state variable

  user = name;

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleOptionSelect(option) {
    setSelectedOption(option);
  }

  // function handleSubmit() {
  //   return ReactDOM.createRoot(document.getElementById("root")).render(
  //     selectedOption === "comp" ? <Score /> : <UserGame />
  //   );
  // }

  async function handleSubmit(event) {
    event.preventDefault();

    if (selectedOption === "frnd" && name) {
      // Store the player name in Firebase Firestore only when "play-frnd" button is clicked and the name is not empty
      const playersCollection = collection(db, "players");
      await addDoc(playersCollection, {
        playerName: name,
      });
    }

    // Proceed with rendering the selected option
    if (selectedOption === "comp") {
      ReactDOM.createRoot(document.getElementById("root")).render(<Score />);
    } else {
      ReactDOM.createRoot(document.getElementById("root")).render(<UserGame />);
    }
  }

  
  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>
          Enter Your Name&emsp;&nbsp;{" "}
          <input
            className="name"
            type="text"
            placeholder="Type..."
            onChange={handleChange}
            value={name}
            id="playername"
          ></input>
        </h1>
        <h1>Number of Rounds&nbsp; </h1>
        {/* <springApp /> */}
        {<DSlider />}
        <motion.div
          className="userselection"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="Computer"
            id="play-comp"
            onClick={() => handleOptionSelect("comp")}
          >
            <img src={robo} alt="Robot"></img>
          </button>
          <button
            className="Multiplayer"
            id="play-frnd"
            onClick={() => handleOptionSelect("frnd")}
          >
            <img src={multi} alt="Multiplayer"></img>
          </button>
        </motion.div>
      </form>
    </div>
  );
}

export default App;
export { user, oppo };
