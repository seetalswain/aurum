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
const continueFromQuestion = document.getElementById("backFromQuestion");
const letterStage = document.getElementById("letterStage");
const letterPaper = document.getElementById("letterPaper");
const openLetterButton = document.getElementById("openLetter");
const continueFromLetter = document.getElementById("toFinal");
const musicControl = document.getElementById("musicControl");
const musicHint = document.getElementById("musicHint");
const soundtrack = document.getElementById("soundtrack");
const quizIntro = document.getElementById("quizIntro");
const quizContent = document.getElementById("quizContent");
const quizHeading = document.getElementById("quiz-heading");
const quizAnswers = document.getElementById("quizAnswers");
const quizReaction = document.getElementById("quizReaction");
const quizContinue = document.getElementById("quizContinue");
const quizProgress = document.getElementById("quizProgress");
const quizProgressLabel = document.getElementById("quizProgressLabel");
const quizProgressFill = document.getElementById("quizProgressFill");
const quizRoundHeading = document.getElementById("quizRoundHeading");
const quizAnswerReveal = document.getElementById("quizAnswerReveal");
const quizLiveScore = document.getElementById("quizLiveScore");
const quizResult = document.getElementById("quizResult");
const quizResultHeading = quizResult.querySelector("h2");
const quizTotalCorrect = document.getElementById("quizTotalCorrect");
const quizTotalIncorrect = document.getElementById("quizTotalIncorrect");
const quizTotalAttempts = document.getElementById("quizTotalAttempts");
const roundComplete = document.getElementById("roundComplete");
const roundCompleteHeading = document.getElementById("roundCompleteHeading");
const roundCompleteScore = document.getElementById("roundCompleteScore");
const roundCompleteNote = document.getElementById("roundCompleteNote");
const continueRound = document.getElementById("continueRound");
const toMystery = document.getElementById("toMystery");
const mysteryMessage = document.getElementById("mysteryMessage");
const mysteryContinue = document.getElementById("mysteryContinue");

const quizRounds = [
    {
        title: "ROUND 1 — THE BABE FILES",
        completion: "The case is looking very, very good for you.",
        questions: [
            { question: "Who is more dramatic?", options: ["Me", "Babe", "Both equally"], correctAnswer: "Me", explanation: "I do bring a certain award-winning flair to the everyday." },
            { question: "Who is more stubborn?", options: ["Me", "Babe", "Both of us"], correctAnswer: "Babe", explanation: "You have a very convincing way of standing your ground." },
            { question: "Who is more likely to overthink?", options: ["Me", "Babe", "Both of us"], correctAnswer: "Both of us", explanation: "Together, we could overthink an overthought thought." },
            { question: "Who is more likely to act tough but secretly be soft?", options: ["Me", "Babe", "Both of us"], correctAnswer: "Babe", explanation: "That soft heart is one of my favourite things about you." },
            { question: "Who is more likely to win a staring contest?", options: ["Me", "Babe", "Neither, we'd start laughing"], correctAnswer: "Neither, we'd start laughing", explanation: "We both know we wouldn't last three seconds." }
        ]
    },
    {
        title: "ROUND 2 — WHO'S THAT PERSON?",
        completion: "You know the character. And, more importantly, you love the plot.",
        questions: [
            { question: "Who is more clingy?", options: ["Me", "Babe", "Both of us"], correctAnswer: "Me", explanation: "I simply happen to like being wherever you are." },
            { question: "Who gets jealous more easily?", options: ["Me", "Babe", "Both of us"], correctAnswer: "Both of us", explanation: "A little proof that we're each other's favourite." },
            { question: "Who is more likely to start a silly argument?", options: ["Me", "Babe", "We don't need a reason 😂"], correctAnswer: "We don't need a reason 😂", explanation: "Our debates have never needed a particularly good premise." },
            { question: "Who takes longer to get ready?", options: ["Me", "Babe", "Both take forever"], correctAnswer: "Me", explanation: "The final look is worth the wait, obviously." },
            { question: "Who is the bigger baby when sick or upset?", options: ["Me", "Babe", "We take turns"], correctAnswer: "We take turns", explanation: "Taking turns means we both get extra looking-after." }
        ]
    },
    {
        title: "ROUND 3 — THE LITTLE THINGS",
        completion: "It's the little things. You do notice them.",
        questions: [
            { question: "Who usually apologises first after a fight?", options: ["Me", "Babe", "Both apologise"], correctAnswer: "Both apologise", explanation: "We care more about finding our way back than being right." },
            { question: "Who misses the other person more?", options: ["Me", "Babe", "Both equally"], correctAnswer: "Both equally", explanation: "We both miss each other before goodbye is even finished." },
            { question: "Who loves giving more affection?", options: ["Me", "Babe", "One gives, the other demands 😂"], correctAnswer: "One gives, the other demands 😂", explanation: "A very efficient affection-distribution system." },
            { question: "Who is more likely to ask for attention?", options: ["Me", "Babe", "Both of us"], correctAnswer: "Me", explanation: "Can you blame me? You're my favourite distraction." },
            { question: "Who wins arguments?", options: ["Me", "Babe", "Nobody. We both lose"], correctAnswer: "Nobody. We both lose", explanation: "The real winner is whoever makes up first." }
        ]
    },
    {
        title: "ROUND 4 — US, IN ANOTHER LIFETIME",
        completion: "I can picture every one of those moments with you.",
        questions: [
            { question: "What would be our perfect date?", options: ["Candlelit dinner", "Late-night drive", "Cosy movie night", "Spontaneous adventure"], correctAnswer: "Candlelit dinner", explanation: "A little romance, a lovely meal, and my favourite company." },
            { question: "What kind of trip would I love with Babe?", options: ["Beach escape", "Mountain getaway", "Exploring a new city", "A quiet countryside stay"], correctAnswer: "Mountain getaway", explanation: "Fresh air, beautiful views, and you beside me." },
            { question: "What would our ideal weekend look like?", options: ["Going out all weekend", "Staying cosy indoors", "A little adventure and a little rest", "Doing absolutely nothing together"], correctAnswer: "Staying cosy indoors", explanation: "A slow, cosy weekend with you sounds like everything." },
            { question: "What would I treasure most as an anniversary surprise?", options: ["A handwritten letter", "A surprise trip", "A meaningful gift", "A day planned just for us"], correctAnswer: "A surprise trip", explanation: "A whole new place to make memories together." },
            { question: "What am I most excited about in our future?", options: ["Making memories together", "Travelling together", "Building a peaceful life", "All the little everyday moments"], correctAnswer: "All the little everyday moments", explanation: "The ordinary days with you are the ones I dream about." }
        ]
    },
    {
        title: "ROUND 5 — HOW WELL DO YOU KNOW ME?",
        completion: "You know me by heart. And I love that you keep learning me.",
        questions: [
            { question: "What makes me feel most loved?", options: ["Quality time", "Words of affection", "Thoughtful gestures", "Hugs and physical affection"], correctAnswer: "Thoughtful gestures", explanation: "It's the care behind the little things that stays with me." },
            { question: "When I'm upset, what do I need most?", options: ["A hug and reassurance", "Someone to make me laugh", "Someone to listen", "A little surprise"], correctAnswer: "A hug and reassurance", explanation: "Your arms have a way of making things feel okay again." },
            { question: "What is my favourite kind of time with Babe?", options: ["Long conversations", "Silly jokes and teasing", "Quiet moments together", "Going out and exploring"], correctAnswer: "Silly jokes and teasing", explanation: "Making each other laugh might be my favourite language." },
            { question: "What matters most to me in a relationship?", options: ["Honesty and trust", "Effort and consistency", "Affection and reassurance", "Understanding and communication"], correctAnswer: "Understanding and communication", explanation: "Being truly heard and understood means everything to me." },
            { question: "If I could ask Babe for one thing every day, what would it be?", options: ["More attention", "More hugs and kisses", "A reminder that he loves me", "More time together"], correctAnswer: "More time together", explanation: "No matter what we do, I just want a little more time with you." }
        ]
    }
];

const incorrectReactions = [
    "EXCUSE ME?! You need to reconsider that answer. 😂",
    "Wrong answer! I expected better from you, Babe.",
    "Penalty: 10 kisses. No negotiations.",
    "Are you sure you know me? Think again, mister.",
    "That answer has officially disappointed the examination committee. 😂",
    "You owe me one extra-long hug for that answer.",
    "I'm choosing to believe you clicked that by accident.",
    "Incorrect. Your affection privileges are temporarily under review."
];

const correctReactions = [
    "Okay, someone has been paying attention. ❤️",
    "That's right! You know me a little too well.",
    "Correct! I knew you'd get that one.",
    "Look at you, Babe. Full marks energy!",
    "See? This is why you're my favourite person."
];

const roundNotes = [
    "The Babe files are officially in very capable hands.",
    "You know the person behind the plot twists.",
    "It's the little things. You do notice them.",
    "Here's to all the places and moments still waiting for us.",
    "You know me by heart. And I love that you keep learning me."
];

const mysteryMessages = [
    "You're my favourite notification. Even when it's just a meme.",
    "I would still choose you, even if you said 'we have food at home.'",
    "Your hugs have excellent reviews. Five stars. No notes.",
    "I like you an unreasonable amount. I have decided that's your problem now.",
    "In case you forgot today: I am very, very glad you're mine.",
    "You make ordinary Tuesdays feel suspiciously like a good day.",
    "I'd share my dessert with you. Probably. Let's not test it.",
    "If you were a movie, I'd watch the ending and then immediately replay it.",
    "I hope something makes you smile today. If not, I volunteer as tribute.",
    "You're handsome. This message has been peer-reviewed by me.",
    "You are my favourite person to do absolutely nothing with.",
    "Consider this your tiny reminder that someone is cheering for you. It's me. Very loudly, internally.",
    "I love your face. Especially the part that smiles when you see me.",
    "You + me + snacks = a plan I will always say yes to."
];

let activeScene = document.querySelector(".scene.is-active");
let isTransitioning = false;
let currentStoryLine = 0;
let currentRoundIndex = 0;
let currentQuestionIndex = 0;
let totalCorrectAnswers = 0;
let totalAttempts = 0;
let roundStats = [];
let isQuestionLocked = false;
let openedSurprises = new Set();
let previousMysteryIndex = -1;
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

function resetLegacyQuestion() {
    answerList.querySelectorAll(".answer-button").forEach((button) => {
        button.classList.remove("is-selected");
        button.setAttribute("aria-pressed", "false");
    });
    answerResponse.textContent = "";
    continueFromQuestion.hidden = true;
}

function resetQuizState() {
    currentRoundIndex = 0;
    currentQuestionIndex = 0;
    totalCorrectAnswers = 0;
    totalAttempts = 0;
    roundStats = quizRounds.map(() => ({ correct: 0, attempts: 0 }));
    isQuestionLocked = false;
    quizIntro.hidden = false;
    quizContent.hidden = true;
    roundComplete.hidden = true;
    quizResult.hidden = true;
    roundComplete.className = "round-complete";
    quizContent.classList.remove("is-changing");
    quizReaction.textContent = "";
    quizAnswerReveal.textContent = "";
    quizAnswerReveal.hidden = true;
}

function resetSurprises() {
    openedSurprises.clear();
    document.querySelectorAll(".surprise-card").forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        document.getElementById(button.getAttribute("aria-controls")).hidden = true;
    });
    toMystery.hidden = true;
}

function resetFilm() {
    currentStoryLine = 0;
    showStoryLine(0, false);
    resetLegacyQuestion();
    resetQuizState();
    resetSurprises();
    mysteryContinue.hidden = true;
    mysteryMessage.textContent = "Go on. I have a feeling you'll like this.";
    letterStage.classList.remove("is-open");
    letterPaper.setAttribute("aria-hidden", "true");
    openLetterButton.hidden = false;
    continueFromLetter.hidden = true;
}

function startQuiz() {
    resetQuizState();
    changeScene("quizScene");
}

function beginQuizChallenge() {
    currentRoundIndex = 0;
    currentQuestionIndex = 0;
    totalCorrectAnswers = 0;
    totalAttempts = 0;
    roundStats = quizRounds.map(() => ({ correct: 0, attempts: 0 }));
    isQuestionLocked = false;
    quizIntro.hidden = true;
    quizContent.hidden = false;
    roundComplete.hidden = true;
    quizResult.hidden = true;
    renderQuizQuestion();
    quizHeading.focus({ preventScroll: true });
}

function updateQuizProgress() {
    quizProgress.setAttribute("aria-valuemax", "25");
    quizProgress.setAttribute("aria-valuenow", String(totalCorrectAnswers));
    quizProgressFill.style.transform = `scaleX(${totalCorrectAnswers / 25})`;
    quizLiveScore.textContent = `Correct: ${totalCorrectAnswers} / 25 · Incorrect attempts: ${totalAttempts - totalCorrectAnswers} · Total attempts: ${totalAttempts}`;
}

function renderQuizQuestion(animate = false) {
    const round = quizRounds[currentRoundIndex];
    const question = round.questions[currentQuestionIndex];
    const overallQuestion = currentRoundIndex * 5 + currentQuestionIndex + 1;
    quizRoundHeading.textContent = round.title;
    quizProgressLabel.textContent = `ROUND ${currentRoundIndex + 1} OF 5 · QUESTION ${currentQuestionIndex + 1} OF 5 · ${String(overallQuestion).padStart(2, "0")} / 25`;
    quizHeading.textContent = question.question;
    quizAnswers.replaceChildren();
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "answer-button";
        button.type = "button";
        button.dataset.answerIndex = String(index);
        button.setAttribute("aria-pressed", "false");
        button.textContent = option;
        quizAnswers.appendChild(button);
    });
    quizReaction.textContent = "";
    quizAnswerReveal.textContent = "";
    quizAnswerReveal.hidden = true;
    quizContinue.hidden = true;
    quizContinue.querySelector("span").textContent = currentQuestionIndex === 4
        ? "Complete this chapter"
        : "Next question";
    isQuestionLocked = false;
    updateQuizProgress();

    quizContent.classList.remove("is-changing");
    if (animate && !reduceMotion) {
        void quizContent.offsetWidth;
        quizContent.classList.add("is-changing");
    }
}

function completeQuizRound() {
    const round = quizRounds[currentRoundIndex];
    const stats = roundStats[currentRoundIndex];
    quizContent.hidden = true;
    roundComplete.hidden = false;
    roundComplete.className = `round-complete round-complete--${currentRoundIndex + 1}`;
    roundCompleteHeading.textContent = `Round ${currentRoundIndex + 1} complete.`;
    roundCompleteScore.textContent = `${stats.correct} of 5 correct · ${stats.attempts} attempts · ${stats.attempts - stats.correct} wrong ${stats.attempts - stats.correct === 1 ? "answer" : "answers"}.`;
    roundCompleteNote.textContent = roundNotes[currentRoundIndex] || round.completion;
    continueRound.querySelector("span").textContent = currentRoundIndex === 4
        ? "See your results"
        : `Continue to round ${currentRoundIndex + 2}`;
    roundCompleteHeading.focus({ preventScroll: true });
}

function showQuizResult() {
    roundComplete.hidden = true;
    quizResult.hidden = false;
    quizTotalCorrect.textContent = `Total correct answers: ${totalCorrectAnswers} out of 25`;
    quizTotalIncorrect.textContent = `Total incorrect attempts: ${totalAttempts - totalCorrectAnswers}`;
    quizTotalAttempts.textContent = `Total attempts: ${totalAttempts}`;
    quizResultHeading.focus({ preventScroll: true });
}

function continueQuiz() {
    if (currentRoundIndex < quizRounds.length - 1) {
        currentRoundIndex += 1;
        currentQuestionIndex = 0;
        roundComplete.hidden = true;
        quizContent.hidden = false;
        renderQuizQuestion(true);
        quizHeading.focus({ preventScroll: true });
        return;
    }

    showQuizResult();
}

function advanceQuizQuestion() {
    if (!isQuestionLocked) return;

    if (currentQuestionIndex < 4) {
        currentQuestionIndex += 1;
        renderQuizQuestion(true);
        quizHeading.focus({ preventScroll: true });
        return;
    }

    completeQuizRound();
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

    resetQuizState();
    changeScene("quizScene");
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
    changeScene("extrasScene");
});

document.getElementById("openQuestion").addEventListener("click", () => {
    resetLegacyQuestion();
    changeScene("questionScene");
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

document.getElementById("openExtras").addEventListener("click", () => {
    changeScene("extrasScene");
});

document.getElementById("backToFinal").addEventListener("click", () => {
    changeScene("finalScene");
});

document.getElementById("openQuiz").addEventListener("click", startQuiz);
document.getElementById("quizBackToExtras").addEventListener("click", () => {
    changeScene("extrasScene");
});
document.getElementById("beginChallenge").addEventListener("click", beginQuizChallenge);
document.getElementById("openSurprises").addEventListener("click", () => {
    changeScene("surprisesScene");
});
document.getElementById("openMystery").addEventListener("click", () => {
    changeScene("mysteryScene");
});

document.querySelectorAll("[data-back-to-extras]").forEach((button) => {
    button.addEventListener("click", () => {
        changeScene("extrasScene");
    });
});

quizAnswers.addEventListener("click", (event) => {
    const answerButton = event.target.closest("[data-answer-index]");
    if (!answerButton || isQuestionLocked) return;

    const question = quizRounds[currentRoundIndex].questions[currentQuestionIndex];
    const selectedOption = question.options[Number(answerButton.dataset.answerIndex)];
    totalAttempts += 1;
    roundStats[currentRoundIndex].attempts += 1;
    quizAnswers.querySelectorAll(".answer-button").forEach((button) => {
        button.classList.remove("is-incorrect", "is-selected", "is-correct");
        button.setAttribute("aria-pressed", String(button === answerButton));
    });

    if (selectedOption !== question.correctAnswer) {
        answerButton.classList.add("is-incorrect");
        quizReaction.textContent = incorrectReactions[(totalAttempts - 1) % incorrectReactions.length];
        quizAnswerReveal.textContent = "";
        quizAnswerReveal.hidden = true;
        updateQuizProgress();
        return;
    }

    isQuestionLocked = true;
    totalCorrectAnswers += 1;
    roundStats[currentRoundIndex].correct += 1;
    answerButton.classList.add("is-selected", "is-correct");
    quizAnswers.querySelectorAll(".answer-button").forEach((button) => {
        button.disabled = true;
    });
    const overallQuestion = (currentRoundIndex * 5) + currentQuestionIndex;
    quizReaction.textContent = correctReactions[overallQuestion % correctReactions.length];
    quizAnswerReveal.textContent = `The answer was “${question.correctAnswer}.” ${question.explanation}`;
    quizAnswerReveal.hidden = false;
    quizContinue.hidden = false;
    updateQuizProgress();
});

quizContinue.addEventListener("click", () => {
    advanceQuizQuestion();
});

document.getElementById("quizAgain").addEventListener("click", () => {
    resetQuizState();
    quizIntro.querySelector("h2").focus({ preventScroll: true });
});

document.getElementById("quizStoryContinue").addEventListener("click", () => {
    changeScene("surprisesScene");
});

continueRound.addEventListener("click", () => {
    continueQuiz();
});

toMystery.addEventListener("click", () => {
    changeScene("mysteryScene");
});

document.querySelectorAll(".surprise-card").forEach((button) => {
    button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isOpen));
        document.getElementById(button.getAttribute("aria-controls")).hidden = isOpen;
        if (!isOpen) openedSurprises.add(button.getAttribute("aria-controls"));
        toMystery.hidden = openedSurprises.size !== 3;
    });
});

document.getElementById("mysteryButton").addEventListener("click", () => {
    const choices = mysteryMessages
        .map((message, index) => ({ message, index }))
        .filter((choice) => choice.index !== previousMysteryIndex);
    const choice = choices[Math.floor(Math.random() * choices.length)];
    previousMysteryIndex = choice.index;
    mysteryMessage.textContent = choice.message;
    mysteryMessage.classList.remove("is-revealing");
    if (!reduceMotion) {
        void mysteryMessage.offsetWidth;
        mysteryMessage.classList.add("is-revealing");
    }
    mysteryContinue.hidden = false;
});

mysteryContinue.addEventListener("click", () => {
    changeScene("letterScene");
});

musicControl.addEventListener("click", async () => {
    if (!soundtrack.paused) {
        soundtrack.pause();
        musicControl.setAttribute("aria-pressed", "false");
        musicControl.setAttribute("aria-label", "Play soundtrack");
        musicControl.querySelector(".music-label").textContent = "SOUNDTRACK";
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

soundtrack.addEventListener("error", () => {
    musicControl.setAttribute("aria-pressed", "false");
    musicControl.setAttribute("aria-label", "Play soundtrack");
    musicControl.querySelector(".music-label").textContent = "SOUNDTRACK";
    showMusicHint();
});

soundtrack.addEventListener("pause", () => {
    if (soundtrack.ended) return;
    musicControl.setAttribute("aria-pressed", "false");
    musicControl.setAttribute("aria-label", "Play soundtrack");
    musicControl.querySelector(".music-label").textContent = "SOUNDTRACK";
});

showStoryLine(0, false);
resetQuizState();
addGoldDust();
