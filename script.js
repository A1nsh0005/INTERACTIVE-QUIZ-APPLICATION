const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: "1995"
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  feedbackEl.textContent = '';
  nextBtn.style.display = 'none';
  scoreEl.textContent = '';

  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  optionsEl.innerHTML = '';

  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => selectAnswer(button, currentQuestion.answer);
    optionsEl.appendChild(button);
  });
}

function selectAnswer(selectedBtn, correctAnswer) {
  // Disable all buttons
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.classList.add('correct');
    feedbackEl.textContent = 'Correct! 🎉';
    score++;
  } else {
    selectedBtn.classList.add('wrong');
    feedbackEl.textContent = `Wrong! The correct answer is "${correctAnswer}".`;
    // Highlight correct answer
    Array.from(optionsEl.children).forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add('correct');
      }
    });
  }
  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  questionEl.textContent = 'Quiz Completed!';
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  nextBtn.style.display = 'none';
  scoreEl.textContent = `Your score: ${score} / ${quizData.length}`;
}

// Start quiz
loadQuestion();
