import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

function LobbyCreation() {
  const [lobbyCode, setLobbyCode] = useState("");

  const generateCode = () => {
    // Generate a random alphanumeric code
    const characters = "0123456789";
    let code = "";
    const codeLength = 6;

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    setLobbyCode(code);
  };

  return (
    <div>
      <h1>Lobby Creation</h1>
      <div className="d-flex row flex-column gap-2">
        <div className="col-2">
          <button onClick={generateCode}>Generate Code</button>
        </div>
        <div className="col-2">Generated Code: {lobbyCode}</div>
      </div>
      <form>
        <h3>Can I have your number please?</h3>
        <input type='text' placeholder='Your keys please Miss Maheshwari'></input>
      </form>
    </div>
  );
}

export default LobbyCreation;
