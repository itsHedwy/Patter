// AMBIENCE
// typing sounds
document.addEventListener("DOMContentLoaded", () => {
  const typingSound = new Audio("shelf/sounds/type.mp3");
  typingSound.volume = 0.05;

  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("keydown", (event) => {
      const key = event.key;

      if (/^[\p{L}\p{N}\p{P}]$/u.test(key)) {
        typingSound.currentTime = 0;
        typingSound.playbackRate = 0.9 + Math.random() * 0.2;
        typingSound.play();
      }
    });
  });
});

// button click sound
document.addEventListener('DOMContentLoaded', () => {
  const sound = new Audio('shelf/sounds/type.mp3');
  sound.volume = 0.15;

  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      sound.currentTime = 0;
      sound.play();
    });
  });
});

// title change
(function updateTitleLoop() {
  setInterval(() => {
    const titleInput = document.querySelector('textarea.title');
    const userTitle = titleInput?.value?.trim();

    if (!userTitle || userTitle === "Untitled") {
      document.title = "Patter";
    } else {
      document.title = `Patter: ${userTitle}`;
    }
  }, 3000);
})();

// CONSISTENCY
// stop title newlines
document.addEventListener("DOMContentLoaded", () => {
  const titleField = document.querySelector(".title");

  if (titleField) {
    const stripNewlines = () => {
      titleField.value = titleField.value.replace(/\r?\n|\r/g, "");
    };

    titleField.addEventListener("input", stripNewlines);
  }
});


// FUNCTIONS
// button export
document.addEventListener("DOMContentLoaded", () => {
    const exportBtns = document.querySelectorAll("#tool_export"); // all elements with id tool_export
    const titleInput = document.querySelector(".title");
    const textInput = document.querySelector("#textInput");

    exportBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let title = titleInput.value.trim() || "Untitled";
            const text = textInput.value.trim();

            const safeFilename = title.replace(/[\/\\?%*:|"<>]/g, "_");
            const fileContent = `${title}\n\n${text}\n\n- Exported from Patter`;

            const blob = new Blob([fileContent], { type: "text/plain" });
            const link = document.createElement("a");

            link.href = URL.createObjectURL(blob);
            link.download = `${safeFilename}.txt`;
            link.click();

            URL.revokeObjectURL(link.href);
        });
    });
});

// fullscreen
document.addEventListener("DOMContentLoaded", () => {
    const fullscreenBtn = document.querySelector("#tool_fullscreen");

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Error attempting fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }
});


document.addEventListener("keydown", async (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isSaveShortcut = (isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s");

    if (isSaveShortcut) {
        e.preventDefault();

        const exportBtn = document.querySelector(".export-txt");
        exportBtn.click();
    }
});

// words and characters counter
document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");
  const counters = document.querySelectorAll(".counter");

  const updateCounters = () => {
    const text = textInput.value.replace(/\n/g, "");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;

    counters[0].textContent = `${words} WORDS`;
    counters[1].textContent = `${chars} CHARACTERS`;
  };

  updateCounters();

  setInterval(updateCounters, 500);
});

// autosave
document.addEventListener('DOMContentLoaded', () => {
  const titleEl = document.querySelector('.title');
  const textEl = document.querySelector('#textInput');

  // Restore saved content
  const savedTitle = localStorage.getItem('patter_title');
  const savedText = localStorage.getItem('patter_text');

  if (savedTitle !== null) titleEl.value = savedTitle;
  if (savedText !== null) textEl.value = savedText;

  setInterval(() => {
    localStorage.setItem('patter_title', titleEl.value);
    localStorage.setItem('patter_text', textEl.value);
  }, 500);
});

// document.addEventListener("DOMContentLoaded", () => {
//   const switchBtn = document.getElementById("switch");

//   switchBtn.addEventListener("click", () => {
//     document.documentElement.classList.toggle("light");
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const switchBtn = document.getElementById("switch");
  const root = document.documentElement;

  const themes = ["default", "light", "dark"];
  let currentIndex = 0;

  const sounds = {
    default: new Audio("shelf/sounds/intro.mp3"),
    light: new Audio("shelf/sounds/intro.mp3"),
    dark: new Audio("shelf/sounds/intro.mp3"),
  };

  switchBtn.addEventListener("click", () => {
    root.classList.remove("light", "dark");

    currentIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[currentIndex];

    if (nextTheme !== "default") {
      root.classList.add(nextTheme);
    }

    const sound = sounds[nextTheme];
    if (sound) {
      sound.currentTime = 3.8;
      sound.playbackRate = 1;
      sound.volume = 0.06;
      sound.play();
    }
  });
});

