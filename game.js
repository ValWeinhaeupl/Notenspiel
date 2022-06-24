let canvas = document.getElementById("canvas");

let lines;

let notes = [];

let timetoguess = 15000;
let abstand = 2000;

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
  lines = document.getElementsByClassName("zeile");
  let randomno = Math.floor(Math.random() * lines.length);

  note.setAttribute("value", randomno);
  lines[lines.length - randomno].appendChild(note);

  if (randomno == 1) {
    note.src = "public/icons/ganze-note-c.png";
  }

  notes.push(note);

  movenotes(note, randomno);
}

function movenotes(note, randomno) {
  setTimeout(() => {
    note.style.left = "0vw";
  }, 10);

  setTimeout(() => {
    note.parentNode.removeChild(note);
    notes.shift();
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

let check = true;
function guess(value) {
  console.log(value);
  console.log(notes[0].getAttribute("value"));
  if (
    notes[0].getAttribute("value") == value ||
    notes[0].getAttribute("value") - 7 == value
  ) {
    if (check) {
      check = false;
      notes[0].src = "public/icons/ganze-note-green.png";
      setTimeout(() => {
        removenext();
        check = true;
      }, 500);
      //console.log(notes[0]);
    }
  } else {
    notes[0].src = "public/icons/ganze-note-red.png";
    setTimeout(() => {
      notes[0].src = "public/icons/ganze-note.png";
    }, 500);
  }
}

var bar = new ProgressBar.Line(document.getElementById("pbar"), {
  strokeWidth: 4,
  easing: "easeInOut",
  duration: 1400,
  color: "#FFEA82",
  trailColor: "#eee",
  trailWidth: 1,
  svgStyle: { width: "100%", height: "100%" },
});

bar.animate(1.0);
