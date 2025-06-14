import { useState, useEffect } from "react";
import moon from "./images/Dark/moon.png";
import sun from "./images/Light/sun.png";
import Die from "./components/Die";

import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

let allSame = false;
function generateRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function generateDiceArray(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({ value: generateRandomNumber(), isHeld: false });
  }
  return arr;
}

export default function App() {
    const { width, height } = useWindowSize()
  const [theme, setTheme] = useState("light");
  const [numDie, setNumDie] = useState(10);
  const [value, setValue] = useState(generateDiceArray(numDie));
  const [inputValue, setInputValue] = useState(numDie.toString());

  // Regenerate dice array whenever numDie changes
  useEffect(() => {
    setValue(generateDiceArray(numDie));
  }, [numDie]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function rollDice() {
    const newArray = value.map(die =>
        die.isHeld ? die : { value: generateRandomNumber(), isHeld: false }
    );

    const firstVal = newArray[0].value;
    allSame = newArray.every(die => die.value === firstVal);

    if (allSame) {
        console.log("You won!");
    }

    setValue(newArray);
    }


  function toggleHeld(index) {
    setValue((prev) =>
      prev.map((die, i) =>
        i === index ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const parsed = parseInt(inputValue);
    if (!isNaN(parsed) && parsed > 0) {
      setNumDie(parsed);
    } else {
      alert("Please enter a valid positive number");
    }
  }

  const newArray = value.map((die, index) => (
    <Die
      key={index}
      theme={theme}
      value={die.value}
      toggleHeld={() => toggleHeld(index)}
      held={die.isHeld}
    />
  ));

  const btnimage = theme === "light" ? sun : moon;

  return (
    <div className="App" id={theme}>
      <h1>Tenzies Game</h1>
      <p>
        Roll until all dice are the same. Click a die to freeze or unfreeze it,
        and lock in your strategy!
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="numdie">Number of dice: </label>
        <input
          type="number"
          id="numdie"
          name="numdie"
          min="1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
      </form>

      <div className="button-container">
        <button className="theme-changer" onClick={toggleTheme}>
          <img
            src={btnimage}
            className="mode-image"
            alt={theme === "light" ? "Sun Icon" : "Moon Icon"}
          />
          {theme.charAt(0).toUpperCase() + theme.slice(1)} mode
        </button>
        <button onClick={rollDice}>Roll dice</button>
      </div>

      <div className="die-container">{newArray}</div>
      {allSame ? <h2>You won! 🎉🎉🎉</h2> : ""}
      {allSame ? <Confetti width={width} height={height}/> : ""}
      
    </div>
  );
}
