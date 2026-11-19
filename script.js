const scenes = Array.from(document.querySelectorAll(".scene"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sceneFadeDuration = reduceMotion ? 0 : 460;
const sceneArrivalDuration = reduceMotion ? 0 : 900;

const storyLines = [
    "Some people enter your life quietly...",
    "And somehow become your favourite part of every day.",
    "Someone who makes ordinary moments feel extraordinary.",
    "Someone who deserves to know just how special he is."
];

const storyLine = document.getElementById("storyLine");
const storyCount = document.getElementById("storyCount");
const storyCard = document.getElementById("storyCard");
const answerList = document.getElementById("answerList");
const answerResponse = document.getElementById("answerResponse");
const continueFromQuestion = document.getElementById("toLetter");
const letterStage = document.getElementById("letterStage");
const letterPaper = document.getElementById("letterPaper");
const openLetterButton = document.getElementById("openLetter");
const continueFromLetter = document.getElementById("toFinal");
const musicControl = document.getElementById("musicControl");
const musicHint = document.getElementById("musicHint");
const soundtrack = document.getElementById("soundtrack");

let activeScene = document.querySelector(".scene.is-active");
let isTransitioning = false;
let currentStoryLine = 0;
let musicHintTimeout;

function changeScene(id) {
    if (isTransitioning) return;

    const nextScene = document.getElementById(id);
    if (!nextScene || nextScene === activeScene) return;

    isTransitioning = true;
    const previousScene = activeScene;
    previousScene.classList.add("is-leaving");

    window.setTimeout(() => {
        previousScene.hidden = true;
        previousScene.classList.remove("is-active", "is-leaving");
        previousScene.setAttribute("aria-hidden", "true");

        nextScene.hidden = false;
        nextScene.setAttribute("aria-hidden", "false");
        nextScene.classList.add("is-active", "is-entering");
        activeScene = nextScene;

        const focusTarget = nextScene.querySelector("h1, h2");
        if (focusTarget) {
            focusTarget.setAttribute("tabindex", "-1");
            focusTarget.focus({ preventScroll: true });
        }

        window.setTimeout(() => {
            nextScene.classList.remove("is-entering");
        }, sceneArrivalDuration);
        window.setTimeout(() => {
            isTransitioning = false;
        }, Math.min(350, sceneArrivalDuration));
    }, sceneFadeDuration);
}

function showStoryLine(index, animate = true) {
    currentStoryLine = index;
    storyLine.textContent = storyLines[index];
    storyCount.innerHTML = `${String(index + 1).padStart(2, "0")} <span>/</span> ${String(storyLines.length).padStart(2, "0")}`;
    storyCard.classList.remove("is-changing");

    if (animate && !reduceMotion) {
        void storyCard.offsetWidth;
        storyCard.classList.add("is-changing");
    }
}

function resetFilm() {
    currentStoryLine = 0;
    showStoryLine(0, false);
    answerList.querySelectorAll(".answer-button").forEach((button) => {
        button.classList.remove("is-selected");
        button.setAttribute("aria-pressed", "false");
    });
    answerResponse.textContent = "";
    continueFromQuestion.hidden = true;
    letterStage.classList.remove("is-open");
    letterPaper.setAttribute("aria-hidden", "true");
    openLetterButton.hidden = false;
    continueFromLetter.hidden = true;
}

function addGoldDust() {
    const dust = document.getElementById("goldDust");
    const moteCount = reduceMotion ? 0 : 26;

    for (let index = 0; index < moteCount; index += 1) {
        const mote = document.createElement("span");
        const opacity = (0.25 + Math.random() * 0.5).toFixed(2);
        mote.className = "dust-mote";
        mote.style.setProperty("--left", `${Math.random() * 100}%`);
        mote.style.setProperty("--size", `${1 + Math.random() * 2}px`);
        mote.style.setProperty("--duration", `${12 + Math.random() * 18}s`);
        mote.style.setProperty("--delay", `${-Math.random() * 26}s`);
        mote.style.setProperty("--drift", `${Math.round(Math.random() * 100 - 50)}px`);
        mote.style.setProperty("--opacity", opacity);
        mote.style.setProperty("--opacity-end", (Number(opacity) * 0.6).toFixed(2));
        dust.appendChild(mote);
    }
}

function showMusicHint() {
    musicHint.hidden = false;
    window.clearTimeout(musicHintTimeout);
    musicHintTimeout = window.setTimeout(() => {
        musicHint.hidden = true;
    }, 6500);
}

async function localSoundtrackIsAvailable() {
    if (window.location.protocol === "file:") return true;

    try {
        const response = await fetch(new URL("assets/music.mp3", window.location.href), {
            method: "HEAD",
            cache: "no-store"
        });
        return response.ok;
    } catch {
        return false;
    }
}

document.getElementById("beginFilm").addEventListener("click", () => {
    changeScene("titleScene");
});

document.getElementById("toStory").addEventListener("click", () => {
    showStoryLine(0, false);
    changeScene("storyScene");
});

document.getElementById("nextStory").addEventListener("click", () => {
    if (currentStoryLine < storyLines.length - 1) {
        showStoryLine(currentStoryLine + 1);
        return;
    }

    changeScene("questionScene");
});

answerList.addEventListener("click", (event) => {
    const answerButton = event.target.closest("[data-answer]");
    if (!answerButton) return;

    const responses = {
        you: "I knew you would say that. I like your confidence.",
        me: "A bold answer. Fortunately, I think you're right, too.",
        both: "Correct. The best stories are better shared."
    };

    answerList.querySelectorAll(".answer-button").forEach((button) => {
        const isSelected = button === answerButton;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });
    answerResponse.textContent = responses[answerButton.dataset.answer];
    continueFromQuestion.hidden = false;
});

continueFromQuestion.addEventListener("click", () => {
    changeScene("letterScene");
});

openLetterButton.addEventListener("click", () => {
    letterStage.classList.add("is-open");
    letterPaper.setAttribute("aria-hidden", "false");
    openLetterButton.hidden = true;
    window.setTimeout(() => {
        continueFromLetter.hidden = false;
    }, reduceMotion ? 0 : 1150);
});

continueFromLetter.addEventListener("click", () => {
    changeScene("finalScene");
});

document.getElementById("replayFilm").addEventListener("click", () => {
    resetFilm();
    changeScene("opening");
});

musicControl.addEventListener("click", async () => {
    if (!soundtrack.paused) {
        soundtrack.pause();
        musicControl.setAttribute("aria-pressed", "false");
        musicControl.setAttribute("aria-label", "Play soundtrack");
        musicControl.querySelector(".music-label").textContent = "SOUNDTRACK";
        return;
    }

    if (!await localSoundtrackIsAvailable()) {
        showMusicHint();
        return;
    }

    try {
        await soundtrack.play();
        musicControl.setAttribute("aria-pressed", "true");
        musicControl.setAttribute("aria-label", "Pause soundtrack");
        musicControl.querySelector(".music-label").textContent = "SOUND ON";
        musicHint.hidden = true;
    } catch {
        musicControl.setAttribute("aria-pressed", "false");
        musicControl.setAttribute("aria-label", "Play soundtrack");
        musicControl.querySelector(".music-label").textContent = "SOUNDTRACK";
        showMusicHint();
    }
});

soundtrack.addEventListener("ended", () => {
    musicControl.setAttribute("aria-pressed", "false");
    musicControl.setAttribute("aria-label", "Play soundtrack");
    musicControl.querySelector(".music-label").textContent = "SOUNDTRACK";
});

soundtrack.addEventListener("pause", () => {
    if (soundtrack.ended) return;
    musicControl.setAttribute("aria-pressed", "false");
    musicControl.setAttribute("aria-label", "Play soundtrack");
    musicControl.querySelector(".music-label").textContent = "SOUNDTRACK";
});

showStoryLine(0, false);
addGoldDust();
