const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key, .piano-key.sharp");
const btnContainer = document.querySelector(".btn-container");
const btn = document.querySelectorAll(".btn");
const fullscreen = document.querySelector(".fullscreen");
const body = document.querySelector("body");
const soundPlay = (event) => {
  const note = event.target.getAttribute("data-note");
  const sound = new Audio("assets/audio/" + note + ".mp3");
  sound.play();
};

const soundPlayKeyboard = (event) => {
  let letter = event.slice(3);
  pianoKeys.forEach((key) => {
    const keyLetter = key.getAttribute("data-letter");
    if (letter == keyLetter) {
      key.classList.add("piano-key-active");
      letter = key.getAttribute("data-note");
      if (key.classList.contains("piano-key-active")) {
        const sound = new Audio("assets/audio/" + letter + ".mp3");
        sound.play();
      }
    }
  });
};

const playNote = (event) => {
  event.target.classList.add("piano-key-active");
  soundPlay(event);
};
const checkKeyPressed = (event) => {
  pianoKeys.forEach((key) => {
    if (key.classList.contains("piano-key-active")) {
      flag = false;
    }
  });
};

const stopPressed = (event) => {
  event.target.classList.remove("piano-key-active");
  pianoKeys.forEach((key) => {
    key.classList.remove("piano-key-active");
  });
};

const checkKeyPushed = (event) => {
  if (
    event.target.classList.contains("piano-key") ||
    event.target.classList.contains("piano-key.sharp")
  ) {
    soundPlay(event);
    event.target.classList.add("piano-key-active");
    pianoKeys.forEach((key) => {
      key.addEventListener("mouseover", playNote);
      key.addEventListener("mouseout", stopPressed);
    });
  }
};

const checkKeyReleased = (event) => {
  if (event.target.classList.contains("piano-key-active")) {
    event.target.classList.remove("piano-key-active");
  }
  pianoKeys.forEach((key) => {
    key.removeEventListener("mouseover", playNote);
    key.removeEventListener("mouseout", stopPressed);
  });
};
var flag = true;
const checkKey = (event) => {
  if (event.repeat == false) {
    soundPlayKeyboard(event.code);
  }
};

const activeBtn = (event) => {
  btn.forEach((btn) => {
    if (!btn.classList.contains("btn-active")) {
      btn.classList.add("btn-active");
      pianoKeys.forEach((key) => {
        key.classList.toggle("letters");
      });
    } else {
      btn.classList.remove("btn-active");
    }
  });
};
const openFullscreen = (event) => {
  if (!document.fullscreenElement) body.requestFullscreen();
  else document.exitFullscreen();
};

fullscreen.addEventListener("mousedown", openFullscreen);
btnContainer.addEventListener("mousedown", activeBtn);
window.addEventListener("mouseup", checkKeyReleased);
piano.addEventListener("mousedown", checkKeyPushed);
piano.addEventListener("mouseup", checkKeyReleased);
window.addEventListener("keydown", checkKey);
window.addEventListener("keyup", stopPressed);
