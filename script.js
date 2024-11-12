// Initial chapter count and total available chapters
let chapterCount = 10;
const totalChapters = 20;
let currentChapter = 1; // To keep track of the current chapter

// Event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    document.querySelector('.login-form').style.display = 'none'; // Hide the login form
    document.getElementById('mainNav').style.display = 'block'; // Show the navigation bar
    document.getElementById('chapterNav').style.display = 'block'; // Show the chapter navigation
});

// Event listeners for the first 10 chapter buttons
const chapterButtons = document.querySelectorAll('.chapter-btn');
chapterButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        loadChapter(index + 1); // Load chapter based on button index
    });
});

// Load More Chapters functionality
document.getElementById('loadMore').addEventListener('click', function() {
    for (let i = chapterCount + 1; i <= Math.min(chapterCount + 5, totalChapters); i++) {
        const button = document.createElement('button');
        button.classList.add('chapter-btn');
        button.innerText = i;
        button.addEventListener('click', function() {
            loadChapter(i); // Load the chapter when clicked
        });
        document.querySelector('.chapter-grid').appendChild(button);
    }
    chapterCount += 5; // Update the chapter count

    // Hide the "Load More" button when all chapters are loaded
    if (chapterCount >= totalChapters) {
        document.getElementById('loadMore').style.display = 'none';
    }
});

// Function to load the quiz questions for the selected chapter
function loadChapter(chapterNumber) {
    currentChapter = chapterNumber; // Update current chapter
    const quizQuestions = getQuizQuestions(chapterNumber);
    document.getElementById('chapterTitle').innerText = `Chapter ${chapterNumber}`;
    const quizContainer = document.getElementById('quizQuestions');
    quizContainer.innerHTML = ''; // Clear previous questions

    quizQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');
        questionElement.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        
        const optionsList = document.createElement('ul');
        optionsList.classList.add('quiz-options');
        
        q.options.forEach(option => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<input type="radio" name="q${index}" value="${option}"> ${option}`;
            optionsList.appendChild(listItem);
        });
        
        questionElement.appendChild(optionsList);
        quizContainer.appendChild(questionElement);
    });

    // Show the submit button after loading the questions
    document.getElementById('submitQuiz').style.display = 'block';
    document.getElementById('quizSection').style.display = 'block';
}

// Function to retrieve the quiz questions for a given chapter
function getQuizQuestions(chapterNumber) {
    const quizzes = [
        // Chapter 1
        [
            { question: "What color is the sky on a clear day?", options: ["Green", "Blue", "Red", "Yellow"], answer: "Blue" },
            { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
            { question: "Which animal is known as the king of the jungle?", options: ["Lion", "Elephant", "Tiger", "Zebra"], answer: "Lion" },
            { question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], answer: "8" },
            { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" }
        ],
        // Chapter 2
        [
            { question: "Which planet is closest to the Sun?", options: ["Earth", "Mars", "Venus", "Mercury"], answer: "Mercury" },
            { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
            { question: "What is the smallest bone in the human body?", options: ["Stapes", "Femur", "Tibia", "Radius"], answer: "Stapes" },
            { question: "How many bones are in the human body?", options: ["206", "208", "210", "212"], answer: "206" },
            { question: "Which gas do plants need for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" }
        ],
        // Additional chapters...
    ];

    return quizzes[chapterNumber - 1] || []; // Return questions for the selected chapter
}

// Event listener for the submit quiz button
document.getElementById('submitQuiz').addEventListener('click', function() {
    const results = calculateResults(currentChapter);
    document.getElementById('result').innerText = `You scored ${results.score} out of ${results.total}`;
    document.getElementById('result').style.display = 'block'; // Show results
});

// Function to calculate quiz results for the current chapter
function calculateResults(chapterNumber) {
    const quizQuestions = getQuizQuestions(chapterNumber);
    const total = quizQuestions.length;
    let score = 0;

    // Check if the selected option is correct for each question
    document.querySelectorAll('.quiz-question').forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption && selectedOption.value === quizQuestions[index].answer) {
            score++;
        }
    });

    return { score, total };
}
