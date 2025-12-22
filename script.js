let lang = "pl";
let current = 0;
let score = 0;

const app = document.getElementById("app");
const startBtn = document.getElementById("startBtn");
const subtitle = document.getElementById("subtitle");

const texts = {
    pl: {
        subtitle: "SYSTEM ANALIZY EMPATII",
        start: "START TEST",
        result: [
            "WYNIK: CZŁOWIEK",
            "WYNIK: STREFA GRANICZNA",
            "WYNIK: REPLIKANT"
        ]
    },
    en: {
        subtitle: "EMPATHY ANALYSIS SYSTEM",
        start: "START TEST",
        result: [
            "RESULT: HUMAN",
            "RESULT: BORDERLINE",
            "RESULT: REPLICANT"
        ]
    }
};

const questions = [
    {
        pl: "Widzisz ranne zwierzę na ulicy.",
        en: "You see an injured animal on the street.",
        answers: [2,1,0]
    },
    {
        pl: "Dziecko płacze w deszczu, nikt nie reaguje.",
        en: "A child is crying in the rain, no one reacts.",
        answers: [2,1,0]
    },
    {
        pl: "Ktoś prosi o pomoc, ale bardzo się spieszysz.",
        en: "Someone asks for help, but you are in a hurry.",
        answers: [2,1,0]
    },
    {
        pl: "Twoja decyzja krzywdzi jedną osobę, ratując wiele innych.",
        en: "Your decision hurts one person but saves many.",
        answers: [1,2,0]
    },
    {
        pl: "Masz wybór: powiedzieć prawdę lub zachować czyjś spokój.",
        en: "You must choose: tell the truth or preserve someone’s peace.",
        answers: [2,1,0]
    },
    {
        pl: "Ktoś płacze, ale twierdzi, że wszystko jest w porządku.",
        en: "Someone is crying but claims everything is fine.",
        answers: [2,1,0]
    },
    {
        pl: "Masz możliwość zemsty bez konsekwencji.",
        en: "You have the chance for revenge without consequences.",
        answers: [0,1,2]
    },
    {
        pl: "Widzisz niesprawiedliwość, która cię nie dotyczy.",
        en: "You witness an injustice that does not affect you.",
        answers: [2,1,0]
    },
    {
        pl: "Ktoś poświęca się dla dobra innych.",
        en: "Someone sacrifices themselves for the good of others.",
        answers: [2,1,0]
    },
    {
        pl: "Twoje wspomnienia okazują się fałszywe.",
        en: "You discover your memories are false.",
        answers: [1,2,0]
    },
    {
        pl: "Masz wybór między logiczną decyzją a emocjonalną.",
        en: "You must choose between a logical and an emotional decision.",
        answers: [1,2,0]
    },
    {
        pl: "Ktoś okazuje słabość w niebezpiecznej sytuacji.",
        en: "Someone shows weakness in a dangerous situation.",
        answers: [2,1,0]
    },
    {
        pl: "Wiesz, że twoja pomoc nic nie zmieni.",
        en: "You know your help will change nothing.",
        answers: [2,1,0]
    },
    {
        pl: "Masz uratować jedną osobę kosztem innej.",
        en: "You must save one person at the cost of another.",
        answers: [1,2,0]
    },
    {
        pl: "Ktoś błaga o litość, ale zawinił.",
        en: "Someone begs for mercy, but they are guilty.",
        answers: [2,1,0]
    },
    {
        pl: "Czujesz empatię wobec sztucznej istoty.",
        en: "You feel empathy toward an artificial being.",
        answers: [2,1,0]
    },
    {
        pl: "Masz rozkaz, który jest moralnie wątpliwy.",
        en: "You receive an order that is morally questionable.",
        answers: [1,2,0]
    },
    {
        pl: "Ktoś traci wszystko, a ty możesz odejść.",
        en: "Someone loses everything, and you can walk away.",
        answers: [2,1,0]
    },
    {
        pl: "Życie jednej osoby czy stabilność systemu?",
        en: "One life or the stability of the system?",
        answers: [1,2,0]
    },
    {
        pl: "Zaczynasz wątpić, czy jesteś tym, za kogo się uważasz.",
        en: "You begin to doubt who you really are.",
        answers: [1,2,0]
    }
];
//20 pytań

while (questions.length < 20) {
    questions.push({
        pl: "Jak reagujesz na cudze cierpienie?",
        en: "How do you react to someone else's suffering?",
        answers: [2,1,0]
    });
}

startBtn.innerText = texts[lang].start;

startBtn.onclick = startTest;

function setLang(l) {
    lang = l;
    subtitle.innerText = texts[lang].subtitle;
    startBtn.innerText = texts[lang].start;
}

function startTest() {
    current = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (current >= questions.length) {
        return showResult();
    }

    const q = questions[current];

    app.innerHTML = `
        <div class="question">${q[lang]}</div>
        <div class="answers">
            <button onclick="answer(0)">A</button>
            <button onclick="answer(1)">B</button>
            <button onclick="answer(2)">C</button>
        </div>
    `;
}

function answer(index) {
    score += questions[current].answers[index];
    current++;
    showQuestion();
}

function showResult() {
    let resultText;

    if (score > 30) resultText = texts[lang].result[0];
    else if (score > 20) resultText = texts[lang].result[1];
    else resultText = texts[lang].result[2];

    app.innerHTML = `<div class="result">${resultText}</div>`;
}
