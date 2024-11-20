const questions = [
    {
        question: "What type of animal is Moo Deng?",
        options: ["hippocampus", "Pygmy hippo", "Bird"],
        answer: "Pygmy hippo"
    },
    {
        question: "What is Moo Deng's signature color?",
        options: ["Pink", "Gray", "Blue"],
        answer: "Pink"
    },
    {
        question: "Which food does Moo Deng love?",
        options: ["Pizza", "Durian", "Watermelon"],
        answer: "Watermelon"
    },
    {
        question: "Where does Moo Deng like to live?",
        options: ["River", "Desert", "Ocean"],
        answer: "River"
    },
    {
        question: "Moo Deng’s name is inspired by which type of food?",
        options: ["Mochi", "BBQ pork bun", "Bouncy pork meatballs"],
        answer: "Bouncy pork meatballs"
    },
    {
        question: "What is Moo Deng's favorite hobby?",
        options: ["Sleeping, eating, and swimming", "Cooking and eating", "Bounce around"],
        answer: "Sleeping, eating, and swimming"
    },
    {
        question: "Who is Moo Deng's mom?",
        options: ["Jonah", "Kha Moo", "Moo Tun"],
        answer: "Jonah"
    },
    {
        question: "Where did Moo Deng originate?",
        options: ["Cambodia", "Taiwan", "Thailand"],
        answer: "Thailand"
    },
    {
        question: "Which zoo in Thailand is Moo Deng in?",
        options: ["Khao Kheow Open Zoo", "Chiang Mai Zoo World", "Safari World Bangkok"],
        answer: "Khao Kheow Open Zoo"
    },
    {
        question: "What species does the Pygmy hippo belong to?",
        options: ["Haliaeetus leucocephalus", "Panthera leo", "Choeropsis liberiensis"],
        answer: "Choeropsis liberiensis"
    }
]


let currentQuestion = 0;
let score = 0;
let timer; 
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

function loadQuestion() {
    questionEl.innerText = shuffledQuestions[currentQuestion].question;
    optionsEl.innerHTML = "";
    shuffledQuestions[currentQuestion].options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
    });
    resetTimer(); 
    startTimer();
}

function checkAnswer(selected) {
    const buttons = document.querySelectorAll("#options button"); 
    buttons.forEach(button => {
        button.disabled = true;
    })
    if (selected === shuffledQuestions[currentQuestion].answer) {
        score++;
        resultEl.innerText = "Correct!";
    } else {
        resultEl.innerText = "Try Again!";
        resultEl.innerText = `Answer is ${shuffledQuestions[currentQuestion].answer}`
    }
    scoreEl.innerText = `Score: ${score}`;
    document.getElementById("next-btn").style.display = "block";
    clearInterval(timer);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        resultEl.innerText = "";
        document.getElementById("next-btn").style.display = "none";
    } else {
        endGame();
    }
}

function endGame() {
    questionEl.innerText = "Game Over!";
    optionsEl.innerHTML = "";
    if (score > 8) { 
        resultEl.innerText = "You are the big fan of Moo Deng!";
        const lineBreak = document.createElement('br'); 
        resultEl.appendChild(lineBreak);  
        const gif = document.createElement('img'); 
        gif.src = 'https://cdn.dribbble.com/users/203287/screenshots/7091371/media/c9cdc5486603553a0e3f405e5b6e4513.gif'; 
        gif.alt = 'Celebration GIF'; 
        gif.style.maxWidth = '50%';
        resultEl.appendChild(gif); 
        } else if (score > 5) { 
            resultEl.innerText = "Great job, Moo Deng fan!";       
        } else { 
            resultEl.innerText = "Try again, Moo Deng awaits!"; 
    }
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("reset").style.display = "block";
}

document.getElementById("start").addEventListener("click", () => {
document.getElementById("start").style.display = "none"; 
document.getElementById("next-btn").style.display = "block";
shuffledQuestions = shuffle(questions.slice());
loadQuestion();
});

document.getElementById("reset").addEventListener("click", () => {
    location.reload();
});

function resetTimer() { 
    clearInterval(timer); 
    timeLeft = 10; 
    timerEl.innerText = `Time: ${timeLeft}`; 
} 

function startTimer() { 
    timer = setInterval(() => { 
        timeLeft--; 
        timerEl.innerText = `Time: ${timeLeft}`; 
        if (timeLeft <= 0) { 
            clearInterval(timer); 
            alert("TIME OUT!! and go to NEXT")               
            nextQuestion(); 
        } }, 1000);
    }

function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
}
       
