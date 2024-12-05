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
        // Chapter 1: Basic Science
        [
            { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
            { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
            { question: "What is photosynthesis?", options: ["Eating process", "Energy production in plants", "Digestion", "Breathing"], answer: "Energy production in plants" },
            { question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], answer: "8" },
            { question: "What is the boiling point of water in Celsius?", options: ["90°C", "100°C", "80°C", "110°C"], answer: "100°C" }
        ],
        // Chapter 2: World Geography
        [
            { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },
            { question: "Which is the largest continent?", options: ["Africa", "Europe", "Asia", "North America"], answer: "Asia" },
            { question: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], answer: "Nile" },
            { question: "In which country would you find the Great Barrier Reef?", options: ["Brazil", "USA", "Australia", "Indonesia"], answer: "Australia" },
            { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: "Vatican City" }
        ],
        // Chapter 3: History
        [
            { question: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: "1945" },
            { question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], answer: "George Washington" },
            { question: "Which ancient civilization built the pyramids?", options: ["Greeks", "Romans", "Egyptians", "Mayans"], answer: "Egyptians" },
            { question: "When did the French Revolution begin?", options: ["1789", "1799", "1779", "1809"], answer: "1789" },
            { question: "Who was Albert Einstein?", options: ["Politician", "Physicist", "Artist", "Writer"], answer: "Physicist" }
        ],
        // Chapter 4: Mathematics
        [
            { question: "What is 7 x 8?", options: ["54", "56", "58", "60"], answer: "56" },
            { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
            { question: "What is 15% of 200?", options: ["20", "25", "30", "35"], answer: "30" },
            { question: "What comes next in the sequence: 2, 4, 8, 16, ___?", options: ["24", "32", "36", "40"], answer: "32" },
            { question: "What is the value of π (pi) rounded to 2 decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], answer: "3.14" }
        ],
        // Chapter 5: Literature
        [
            { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
            { question: "What is the longest novel in the world?", options: ["War and Peace", "Don Quixote", "Remembrance of Things Past", "Clarissa"], answer: "Remembrance of Things Past" },
            { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Ernest Hemingway", "Harper Lee", "John Steinbeck", "F. Scott Fitzgerald"], answer: "Harper Lee" },
            { question: "What is the first Harry Potter book called?", options: ["Harry Potter and the Sorcerer's Stone", "Harry Potter and the Chamber of Secrets", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Goblet of Fire"], answer: "Harry Potter and the Sorcerer's Stone" },
            { question: "Who wrote '1984'?", options: ["Ray Bradbury", "George Orwell", "Aldous Huxley", "Kurt Vonnegut"], answer: "George Orwell" }
        ],
        // Chapter 6: Technology
        [
            { question: "What does CPU stand for?", options: ["Computer Processing Unit", "Central Processing Unit", "Computer Personal Unit", "Central Personal Unit"], answer: "Central Processing Unit" },
            { question: "Who founded Apple?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Elon Musk"], answer: "Steve Jobs" },
            { question: "What is the most popular programming language?", options: ["Java", "Python", "C++", "JavaScript"], answer: "JavaScript" },
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
            { question: "What is the largest social media platform?", options: ["Twitter", "Instagram", "Facebook", "LinkedIn"], answer: "Facebook" }
        ],
        // Chapter 7: Music
        [
            { question: "Who is known as the 'King of Pop'?", options: ["Elvis Presley", "Michael Jackson", "Prince", "David Bowie"], answer: "Michael Jackson" },
            { question: "In which country did rock and roll originate?", options: ["UK", "USA", "Canada", "Australia"], answer: "USA" },
            { question: "Who wrote the musical 'Hamilton'?", options: ["Lin-Manuel Miranda", "Andrew Lloyd Webber", "Stephen Sondheim", "Bock and Harnick"], answer: "Lin-Manuel Miranda" },
            { question: "What instrument does a pianist play?", options: ["Guitar", "Violin", "Piano", "Drums"], answer: "Piano" },
            { question: "Who is Beyoncé's husband?", options: ["Jay-Z", "Kanye West", "Drake", "P. Diddy"], answer: "Jay-Z" }
        ],
        // Chapter 8: Sports
        [
            { question: "How many players are on a soccer team?", options: ["9", "10", "11", "12"], answer: "11" },
            { question: "In which sport would you perform a slam dunk?", options: ["Tennis", "Basketball", "Volleyball", "Baseball"], answer: "Basketball" },
            { question: "What is the most popular sport in the world?", options: ["American Football", "Cricket", "Basketball", "Soccer"], answer: "Soccer" },
            { question: "How many Olympic rings are there?", options: ["4", "5", "6", "7"], answer: "5" },
            { question: "Where were the first modern Olympic Games held?", options: ["London", "Paris", "Athens", "Rome"], answer: "Athens" }
        ],
        // Chapter 9: Art
        [
            { question: "Who painted the Mona Lisa?", options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },
            { question: "What art movement did Salvador Dali belong to?", options: ["Impressionism", "Surrealism", "Cubism", "Renaissance"], answer: "Surrealism" },
            { question: "What color do you get when you mix red and blue?", options: ["Green", "Orange", "Purple", "Yellow"], answer: "Purple" },
            { question: "Who painted 'Starry Night'?", options: ["Claude Monet", "Vincent Van Gogh", "Paul Gauguin", "Paul Cézanne"], answer: "Vincent Van Gogh" },
            { question: "What is the primary color of the Sistine Chapel ceiling?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Blue" }
        ],
        // Chapter 10: General Knowledge
        [
            { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], answer: "Blue Whale" },
            { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: "Tokyo" },
            { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
            { question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], answer: "Avocado" },
            { question: "What is the chemical symbol for gold?", options: ["Ag", "Fe", "Au", "Cu"], answer: "Au" }
        ]
    ];

    return quizzes[chapterNumber - 1] || []; // Return questions for the selected chapter
}

// Calculate quiz results for the current chapter when the quiz is submitted
document.getElementById('submitQuiz').addEventListener('click', function() {
    const results = calculateResults(currentChapter);
    
    // Create a detailed results display
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = ''; // Clear previous results
    
    // Create score summary
    const scoreSummary = document.createElement('div');
    scoreSummary.classList.add('score-summary');
    scoreSummary.innerHTML = `
        <h2>Quiz Results</h2>
        <div class="score-info">
            <p><strong>Chapter:</strong> ${currentChapter}</p>
            <p><strong>Score:</strong> ${results.score} / ${results.total}</p>
            <p><strong>Percentage:</strong> ${results.percentage}%</p>
        </div>
    `;
    
    // Create detailed results breakdown
    const detailedResults = document.createElement('div');
    detailedResults.classList.add('detailed-results');
    
    results.details.forEach((questionResult, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item', questionResult.isCorrect ? 'correct' : 'incorrect');
        
        resultItem.innerHTML = `
            <h4>Question ${index + 1}</h4>
            <p>${questionResult.question}</p>
            <p class="your-answer"><strong>Your Answer:</strong> ${questionResult.selectedAnswer || 'No answer selected'}</p>
            <p class="correct-answer"><strong>Correct Answer:</strong> ${questionResult.correctAnswer}</p>
        `;
        
        detailedResults.appendChild(resultItem);
    });
    
    // Create feedback based on performance
    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('feedback');
    feedbackContainer.innerHTML = getFeedback(results.percentage);
    
    // Append all elements to result container
    resultContainer.appendChild(scoreSummary);
    resultContainer.appendChild(detailedResults);
    resultContainer.appendChild(feedbackContainer);
    
    // Show the results section with a transition
    resultContainer.style.display = 'block';
    
    // Disable quiz submission after taking the quiz
    document.getElementById('submitQuiz').disabled = true;
});

// Function to calculate quiz results for the current chapter
function calculateResults(chapterNumber) {
    const quizQuestions = getQuizQuestions(chapterNumber);
    const total = quizQuestions.length;
    let score = 0;
    
    // Detailed results tracking
    const details = [];

    // Check if the selected option is correct for each question
    document.querySelectorAll('.quiz-question').forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        const currentQuestion = quizQuestions[index];
        
        let isCorrect = false;
        let selectedAnswer = 'No answer selected';
        
        if (selectedOption) {
            selectedAnswer = selectedOption.value;
            isCorrect = selectedOption.value === currentQuestion.answer;
        }
        
        // Track detailed results
        details.push({
            question: currentQuestion.question,
            selectedAnswer: selectedAnswer,
            correctAnswer: currentQuestion.answer,
            isCorrect: isCorrect
        });
        
        // Calculate score
        if (isCorrect) {
            score++;
        }
    });
    
    // Calculate percentage
    const percentage = Math.round((score / total) * 100);
    
    return { 
        score, 
        total, 
        percentage, 
        details 
    };
}

// Function to provide feedback based on performance
function getFeedback(percentage) {
    let feedbackMessage;
    if (percentage >= 90) {
        feedbackMessage = `<h3>Excellent Work! 🏆</h3><p>Exceptional understanding of the material.</p>`;
    } else if (percentage >= 80) {
        feedbackMessage = `<h3>Great Job! 👍</h3><p>Solid grasp of the content, a few more reviews will help.</p>`;
    } else if (percentage >= 70) {
        feedbackMessage = `<h3>Good Effort! 👀</h3><p>You’re on the right track but there's room for improvement.</p>`;
    } else if (percentage >= 50) {
        feedbackMessage = `<h3>Needs Improvement 📚</h3><p>Consider reviewing the material.</p>`;
    } else {
        feedbackMessage = `<h3>Requires Serious Attention 🚨</h3><p>Focus on understanding fundamental concepts.</p>`;
    }

    return `<div>${feedbackMessage}</div>`;
}

// Optional: Add CSS to style the results
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    #result {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        margin-top: 20px;
    }
    .score-summary {
        text-align: center;
        margin-bottom: 20px;
        border-bottom: 2px solid #eaeaea;
        padding-bottom: 10px;
    }
    .score-info p {
        font-size: 1.1em;
        margin: 5px 0;
    }
    .result-item {
        margin-bottom: 15px;
        padding: 15px;
        border-radius: 5px;
        transition: all 0.2s;
    }
    .result-item.correct {
        background-color: #e6ffed;
        border-left: 5px solid #28a745;
    }
    .result-item.incorrect {
        background-color: #fce8e6;
        border-left: 5px solid #dc3545;
    }
    .feedback {
        text-align: center;
        margin-top: 20px;
        padding: 15px;
        border-radius: 10px;
        background-color: #f9f9f9;
        box-shadow: 0 0 5px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(styleSheet);