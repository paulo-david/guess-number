// father element that holds all displays
let displayList = document.getElementById("display-list");

// selected color for leds in display
let color = "black";

// dict of color values
let colors = {
  black: "var(--black-800)",
  green: "var(--green)",
  red: "var(--red)",
};

// representation of numbers depending on which segment is turned on
let numbers = [
  { a: true, b: true, c: true, d: true, e: true, f: true, g: false },
  { a: false, b: true, c: true, d: false, e: false, f: false, g: false },
  { a: true, b: true, c: false, d: true, e: true, f: false, g: true },
  { a: true, b: true, c: true, d: true, e: false, f: false, g: true },
  { a: false, b: true, c: true, d: false, e: false, f: true, g: true },
  { a: true, b: false, c: true, d: true, e: false, f: true, g: true },
  { a: true, b: false, c: true, d: true, e: true, f: true, g: true },
  { a: true, b: true, c: true, d: false, e: false, f: false, g: false },
  { a: true, b: true, c: true, d: true, e: true, f: true, g: true },
  { a: true, b: true, c: true, d: true, e: false, f: true, g: true },
];

const colorSegments = (digit, segment_list) => {
  let is_colored = numbers[digit];

  for (const segment in is_colored) {
    if (is_colored[segment]) {
      const segmentHTML = segment_list[segment];
      const segmentClass = segmentHTML.classList[0];

      const classCapitalized =
        segmentClass.charAt(0).toUpperCase() + segmentClass.slice(1);

      segmentHTML.style[`border${classCapitalized}Color`] = colors[color];

      if (segmentClass === "middle") {
        segmentHTML.style.backgroundColor = colors[color];
        segmentHTML.classList.add(`middle-${color}`);
      }
    }
  }
};

// create all segments from the display, and return it
const getDigitElement = (digit) => {
  let display = document.createElement("div");
  display.classList.add("display");

  let a = document.createElement("div");
  a.classList.add("top");

  let b = document.createElement("div");
  b.classList.add("right");

  let c = document.createElement("div");
  c.classList.add("right");
  c.classList.add("right_bottom");

  let d = document.createElement("div");
  d.classList.add("bottom");

  let e = document.createElement("div");
  e.classList.add("left");
  e.classList.add("left_bottom");

  let f = document.createElement("div");
  f.classList.add("left");

  let g = document.createElement("div");
  g.classList.add("middle");

  colorSegments(digit, { a, b, c, d, e, f, g });

  display.appendChild(a);
  display.appendChild(b);
  display.appendChild(c);
  display.appendChild(d);
  display.appendChild(e);
  display.appendChild(f);
  display.appendChild(g);

  return display;
};

const printDisplay = (number, numberColor = "black") => {
  // select color of the leds in the display
  color = numberColor;
  // erase previous displays
  displayList.innerHTML = "";

  let number_string = number.toString();

  // for every digit in the number, create the display and render it
  for (let i = 0; i < number_string.length; i++) {
    let digit = getDigitElement(number_string[i]);
    displayList.appendChild(digit);
  }
};

export default printDisplay;
