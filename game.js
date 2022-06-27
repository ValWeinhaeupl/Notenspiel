let canvas = document.getElementById("canvas");

let lines;

let notes = [];

let timetoguess = 15000;
let abstand = 3000;
let temptastatur =
  '<div class="noline zeile" value="11">g</div><div class="line zeile" value="10">f</div><div class="noline zeile" value="9">e</div><div class="line zeile" value="8">d</div><div class="noline zeile" value="7">c</div><div class="line zeile" value="6">h</div><div class="noline zeile" value="5">a</div><div class="line zeile" value="4">g</div><div class="noline zeile" value="3">f</div><div class="line zeile" value="2">e</div><div class="noline zeile" value="1">d</div><div class="noline zeile" value="0">c</div></div><div id="buttons"><div class="button" onclick="guess("1")">C</div><div class="button" onclick="guess("2")">D</div><div class="button" onclick="guess("3")">E</div><div class="button" onclick="guess("4")">F</div><div class="button" onclick="guess("5")">G</div><div class="button" onclick="guess("6")">A</div><div class="button" onclick="guess("7")">H</div>';
let zeilenanzahl = 15;
let pbar = document.getElementById("pbar");
let pbarspeed = 500;
let punishment = 5;
let reward = 10;
let level = 1;
let leveldata = [
  { timetoguess: 15000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 14000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 13000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 12000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 11000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 10000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 9000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 8000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 7000, abstand: 3000, pbarspeed: 500 },
  { timetoguess: 6000, abstand: 3000, pbarspeed: 500 },
];

//loads notes endlessly
setInterval(() => {
  loadnotes();
  console.log(notes);
}, abstand);

function loadnotes() {
  let note = document.createElement("img");
  note.src = "public/icons/ganze-note.png";
  note.className = "noten";
  note.style.left = "90vw";
  note.style.transition = "left " + timetoguess + "ms linear;";
  lines = document.getElementsByClassName("zeile");
  let randomno = Math.floor(Math.random() * zeilenanzahl + 1);
  if (randomno == 16) {
    randomno--;
  }

  note.setAttribute("value", randomno);
  lines[zeilenanzahl - randomno].appendChild(note);

  if (randomno == 1 || randomno == 13) {
    note.src = "public/icons/ganze-note-c.png";
  } else if (randomno == 14) {
    note.src = "public/icons/ganze-note-h2.png";
  } else if (randomno == 15) {
    note.src = "public/icons/ganze-note-c3.png";
  }

  notes.push(note);

  movenotes(note, randomno);
}

function movenotes(note, randomno) {
  setTimeout(() => {
    note.style.left = "0vw";
  }, 10);

  //if you take to long, fehler
  setTimeout(() => {
    note.parentNode.removeChild(note);
    notes.shift();
    wrongorlate();
  }, timetoguess);
}

// document.addEventListener("keyup", (e) => {
//   if (e.code === "ArrowUp") {
//     removenext();
//   }
// });

function removenext() {
  let temp = notes.shift();
  temp.parentNode.removeChild(temp);
  lines = document.getElementsByClassName("zeile");
  console.log(notes);
}

// var bar = new ProgressBar.Line(document.getElementById("pbar"), {
//   strokeWidth: 50,
//   easing: "easeInOut",
//   duration: 1400,
//   color: "#FFEA82",
//   trailColor: "#eee",
//   trailWidth: 50,
//   svgStyle: { width: "100%", height: "100%" },
// });

// bar.animate(1);

let check = true;
function guess(value) {
  console.log(value);
  console.log(notes[0].getAttribute("value"));
  if (notes[0].getAttribute("value") == value) {
    if (check) {
      check = false;
      notes[0].src = "public/icons/ganze-note-green.png";
      rightguess();
      setTimeout(() => {
        removenext();
        check = true;
      }, 500);
      //console.log(notes[0]);
    }
  } else {
    wrongorlate();

    let tempicon = notes[0].src;
    notes[0].src = "public/icons/ganze-note-red.png";
    setTimeout(() => {
      notes[0].src = tempicon;
    }, 500);
  }
}

let pbarinterval = setInterval(() => {
  pbar.value--;
  if (pbar.value > 70) {
    pbar.style.background = "green";
  } else if (pbar.value > 30) {
    pbar.style.background = "yellow";
  } else {
    pbar.style.background = "darkred";
  }
}, pbarspeed);

function rightguess() {
  pbar.value += reward;
}

function wrongorlate() {
  pbar.value -= punishment;
}

function levelup() {
  level++;
  pbarspeed = leveldata[level].pbarspeed;
  timetoguess = leveldata[level].timetoguess;
  for (let i = 0; i < notes.lenght; i++) {
    notes[i].style = "transition-duration: " + timetoguess + "ms";
  }
  pbar.style = "transition-duration: " + pbarspeed + "ms";
}

function leveldown() {}
