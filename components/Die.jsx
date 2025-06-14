import twodark from "../images/Dark/dice-six-faces-two.png"
import twolight from "../images/Light/dice-six-faces-two.png"

import onedark from "../images/Dark/dice-six-faces-one.png"
import onelight from "../images/Light/dice-six-faces-one.png"

import threedark from "../images/Dark/dice-six-faces-three.png"
import threelight from "../images/Light/dice-six-faces-three.png"

import fourdark from "../images/Dark/dice-six-faces-four.png"
import fourlight from "../images/Light/dice-six-faces-four.png"

import fivedark from "../images/Dark/dice-six-faces-five.png"
import fivelight from "../images/Light/dice-six-faces-five.png"

import sixdark from "../images/Dark/dice-six-faces-six.png"
import sixlight from "../images/Light/dice-six-faces-six.png"


const diceImages = {
  dark: {
    one: onedark,
    two: twodark,
    three: threedark,
    four: fourdark,
    five: fivedark,
    six: sixdark
  },
  light: {
    one: onelight,
    two: twolight,
    three: threelight,
    four: fourlight,
    five: fivelight,
    six: sixlight
  }
};

function numberToWord(num) {
  const words = ["zero", "one", "two", "three", "four", "five", "six"];
  return words[num] || "Invalid";
}

export default function Die({theme, value, toggleHeld, held}){


    let randomnum = numberToWord(value);
    let imgsrc = diceImages[theme][randomnum];

    return (
        <img src = {imgsrc} className={`die-image ${held ? "held" : ""}`} onClick ={toggleHeld}/>
    )
}
