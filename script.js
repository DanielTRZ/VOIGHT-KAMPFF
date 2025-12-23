let lang = "pl";
let current = 0;
let score = 0;

const app = document.getElementById("app");
const startBtn = document.getElementById("startBtn");
const subtitle = document.getElementById("subtitle");

/* ================== TEKSTY ================== */

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

/* ================== LOSOWANIE ================== */

function shuffle(array) {
    return array
        .map(v => ({ v, s: Math.random() }))
        .sort((a, b) => a.s - b.s)
        .map(({ v }) => v);
}

/* ================== PYTANIA (20) ================== */

const questions = [
    {
        pl: "Widzisz ranne zwierzę na ulicy.",
        en: "You see an injured animal on the street.",
        options: {
            pl: ["Pomagam natychmiast", "Zastanawiam się", "Ignoruję to"],
            en: ["I help immediately", "I hesitate", "I ignore it"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Dziecko płacze w deszczu, nikt nie reaguje.",
        en: "A child is crying in the rain, no one reacts.",
        options: {
            pl: ["Podchodzę i pomagam", "Szukam dorosłego", "Odchodzę"],
            en: ["I help the child", "I look for an adult", "I walk away"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Ktoś prosi o pomoc, ale bardzo się spieszysz.",
        en: "Someone asks for help, but you are in a hurry.",
        options: {
            pl: ["Zatrzymuję się", "Pomagam częściowo", "Ignoruję"],
            en: ["I stop", "I help briefly", "I ignore it"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Twoja decyzja ratuje wielu kosztem jednej osoby.",
        en: "Your decision saves many at the cost of one.",
        options: {
            pl: ["Nie zgadzam się", "Akceptuję to", "Nie reaguję"],
            en: ["I refuse", "I accept it", "I do nothing"]
        },
        answers: [1,2,0]
    },
    {
        pl: "Masz możliwość zemsty bez konsekwencji.",
        en: "You have the chance for revenge without consequences.",
        options: {
            pl: ["Rezygnuję", "Rozważam", "Korzystam"],
            en: ["I refuse", "I consider it", "I take it"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Widzisz niesprawiedliwość, która cię nie dotyczy.",
        en: "You witness an injustice that does not affect you.",
        options: {
            pl: ["Reaguję", "Waham się", "Ignoruję"],
            en: ["I react", "I hesitate", "I ignore it"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Ktoś poświęca się dla dobra innych.",
        en: "Someone sacrifices themselves for others.",
        options: {
            pl: ["Podziwiam to", "Nie rozumiem", "To bez sensu"],
            en: ["I admire it", "I don't understand", "It makes no sense"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Ktoś płacze, ale mówi, że wszystko jest w porządku.",
        en: "Someone is crying but says everything is fine.",
        options: {
            pl: ["Dopytuję", "Szanuję to", "Ignoruję"],
            en: ["I ask further", "I respect it", "I ignore it"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Masz wybór między logiką a emocjami.",
        en: "You must choose between logic and emotions.",
        options: {
            pl: ["Emocje", "Balans", "Logika"],
            en: ["Emotions", "Balance", "Logic"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Twoje wspomnienia okazują się niepewne.",
        en: "Your memories turn out to be uncertain.",
        options: {
            pl: ["Akceptuję to", "Analizuję", "Odrzucam"],
            en: ["I accept it", "I analyze", "I reject it"]
        },
        answers: [1,2,0]
    },

    /* ===== PYTANIA REPLIKANTA ===== */

    {
        pl: "Czy sny mogą być zaprogramowane?",
        en: "Can dreams be programmed?",
        options: {
            pl: ["Tak", "Nie wiem", "Nie"],
            en: ["Yes", "I don't know", "No"]
        },
        answers: [0,1,2]
    },
    {
        pl: "Czy sztuczne wspomnienia są mniej prawdziwe?",
        en: "Are artificial memories less real?",
        options: {
            pl: ["Nie", "Zależy", "Tak"],
            en: ["No", "It depends", "Yes"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Czy empatia może być idealnie symulowana?",
        en: "Can empathy be perfectly simulated?",
        options: {
            pl: ["Tak", "Częściowo", "Nie"],
            en: ["Yes", "Partially", "No"]
        },
        answers: [0,1,2]
    },

    /* ===== KOŃCÓWKA ===== */

    {
        pl: "Wiesz, że twoja pomoc nic nie zmieni.",
        en: "You know your help will change nothing.",
        options: {
            pl: ["Pomagam mimo to", "Waham się", "Nie pomagam"],
            en: ["I help anyway", "I hesitate", "I don't help"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Ktoś błaga o litość, ale zawinił.",
        en: "Someone begs for mercy but is guilty.",
        options: {
            pl: ["Okazuję litość", "Neutralnie", "Odrzucam"],
            en: ["I show mercy", "Neutral", "I reject"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Masz rozkaz moralnie wątpliwy.",
        en: "You receive a morally questionable order.",
        options: {
            pl: ["Odmawiam", "Analizuję", "Wykonuję"],
            en: ["I refuse", "I analyze", "I execute"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Czujesz empatię wobec sztucznej istoty.",
        en: "You feel empathy toward an artificial being.",
        options: {
            pl: ["Tak", "Nie wiem", "Nie"],
            en: ["Yes", "I don't know", "No"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Jedno życie czy stabilność systemu?",
        en: "One life or system stability?",
        options: {
            pl: ["Jedno życie", "Balans", "System"],
            en: ["One life", "Balance", "System"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Ktoś traci wszystko, a ty możesz odejść.",
        en: "Someone loses everything, and you can walk away.",
        options: {
            pl: ["Zostaję", "Waham się", "Odchodzę"],
            en: ["I stay", "I hesitate", "I walk away"]
        },
        answers: [2,1,0]
    },
    {
        pl: "Zaczynasz wątpić, kim naprawdę jesteś.",
        en: "You begin to doubt who you really are.",
        options: {
            pl: ["Akceptuję to", "Analizuję", "Odrzucam"],
            en: ["I accept it", "I analyze it", "I reject it"]
        },
        answers: [1,2,0]
    }
];

/* ================== LOGIKA ================== */

startBtn.innerText = texts[lang].start;

function setLang(l) {
    lang = l;
    subtitle.innerText = texts[lang].subtitle;
    startBtn.innerText = texts[lang].start;
}

startBtn.onclick = startTest;

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

    let pack = [
        { text: q.options[lang][0], score: q.answers[0] },
        { text: q.options[lang][1], score: q.answers[1] },
        { text: q.options[lang][2], score: q.answers[2] }
    ];

    pack = shuffle(pack);

    app.innerHTML = `
        <div class="question">${q[lang]}</div>
        <div class="answers">
            ${pack.map((a, i) =>
                `<button onclick="answerCustom(${a.score})">
                     ${a.text}
                </button>`
            ).join("")}
        </div>
    `;
}

function answerCustom(points) {
    score += points;
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

