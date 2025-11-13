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
  sound.volume = 0.15

  const buttons = document.querySelectorAll('#click_sound');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      sound.currentTime = 0;
      sound.play();
    });
  });
});


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
    const exportBtn = document.querySelector(".export-txt");
    const titleInput = document.querySelector(".title");
    const textInput = document.querySelector("#textInput");

    exportBtn.addEventListener("click", () => {
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

// button clear
document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.querySelector(".reset-button");
  const titleField = document.querySelector(".title");
  const textField = document.querySelector(".text");
  const counters = document.querySelectorAll(".counter");

  if (resetButton && titleField && textField && counters.length >= 2) {
    resetButton.addEventListener("click", () => {
      titleField.value = "Untitled";
      textField.value = "";

      counters[0].textContent = "0 WORDS";
      counters[1].textContent = "0 CHARACTERS";
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

    textInput.addEventListener("input", updateCounters);
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

  // Save on input
  titleEl.addEventListener('input', () => {
    localStorage.setItem('patter_title', titleEl.value);
  });

  textEl.addEventListener('input', () => {
    localStorage.setItem('patter_text', textEl.value);
  });
});


