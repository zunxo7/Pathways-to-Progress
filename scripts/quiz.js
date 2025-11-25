// Quiz System with Question Pool and Answer Shuffling
(function() {
    'use strict';
    
    // Pool of 12 medium-to-hard questions with balanced answer lengths
    const questionPool = [
        {
            id: 'q1',
            question: 'What evidence from the need assessment directly led to creating emergency contact stickers?',
            options: {
                a: 'Community members lacked knowledge of emergency numbers (1122, 15)',
                b: 'Schools did not have first-aid training programs',
                c: 'Traffic signals were not functioning properly',
                d: 'Insufficient lighting on major roads during nighttime'
            },
            correct: 'a'
        },
        {
            id: 'q2',
            question: 'How does the helmet demonstration near AIOU address SDG 3.6 target?',
            options: {
                a: 'High motorcyclist traffic density enables direct engagement with target audience',
                b: 'Demonstrating proper helmet strapping reduces head injury risk from accidents',
                c: 'The area had existing traffic infrastructure for demonstrations',
                d: 'University students are more receptive to safety messages'
            },
            correct: 'b'
        },
        {
            id: 'q3',
            question: 'What systematic approach identified Pitras Bukhari Road for the zebra crossing?',
            options: {
                a: 'Multiple H-sector areas were surveyed, revealing schools lacked crossings',
                b: 'The team randomly selected locations to test effectiveness',
                c: 'City council provided a predetermined list of priority locations',
                d: 'Location chosen based on proximity to team members\' residences'
            },
            correct: 'a'
        },
        {
            id: 'q4',
            question: 'What made the Roots International session more effective than traditional lectures?',
            options: {
                a: 'Interactive demonstrations and visual learning with Q&A engagement',
                b: 'Written examinations and certificates motivated students',
                c: 'Theoretical lectures provided comprehensive topic coverage',
                d: 'Field trips gave students real-world exposure'
            },
            correct: 'a'
        },
        {
            id: 'q5',
            question: 'How does dual SDG alignment (3 and 4) create synergistic impact?',
            options: {
                a: 'First-aid training combined with education creates immediate and long-term impact',
                b: 'The project focused primarily on SDG 3 only',
                c: 'SDG alignment was theoretical and did not influence activities',
                d: 'Each SDG was addressed in separate, isolated activities'
            },
            correct: 'a'
        },
        {
            id: 'q6',
            question: 'What operational constraints did manual sticker production reveal?',
            options: {
                a: 'Printing alignment issues and manual cutting were time-intensive',
                b: 'The team had unlimited resources for production',
                c: 'Sticker production was outsourced to professional services',
                d: 'The number of stickers was intentionally limited for testing'
            },
            correct: 'a'
        },
        {
            id: 'q7',
            question: 'Why was AIOU location optimal for helmet demonstration impact?',
            options: {
                a: 'High motorcyclist concentration with visible public demonstration',
                b: 'The location was convenient for team members to access',
                c: 'University administration specifically requested the demonstration',
                d: 'The area had better lighting for demonstration purposes'
            },
            correct: 'a'
        },
        {
            id: 'q8',
            question: 'How did the team demonstrate resilience during sticker production challenges?',
            options: {
                a: 'Manual cutting despite alignment issues showed commitment to quality',
                b: 'The team abandoned sticker production when issues arose',
                c: 'External vendors were hired to resolve all challenges',
                d: 'The project timeline was extended indefinitely'
            },
            correct: 'a'
        },
        {
            id: 'q9',
            question: 'What deeper understanding did ITP collaboration provide?',
            options: {
                a: 'Traffic control observation provided insights into systemic safety issues',
                b: 'The collaboration was purely observational without learning',
                c: 'ITP officers provided only basic traffic rule information',
                d: 'The experience focused solely on career exploration'
            },
            correct: 'a'
        },
        {
            id: 'q10',
            question: 'How did 8-week duration with time constraints demonstrate resource optimization?',
            options: {
                a: 'Strategic prioritization of high-impact interventions over lower-impact activities',
                b: 'The team had unlimited time flexibility for scheduling',
                c: 'Time constraints did not affect project planning or execution',
                d: 'All activities were scheduled without considering limitations'
            },
            correct: 'a'
        },
        {
            id: 'q11',
            question: 'What makes school session methodology better for assessing knowledge transfer?',
            options: {
                a: 'Structured Q&A and interactive demonstrations allow immediate assessment',
                b: 'School sessions and public demonstrations used identical methods',
                c: 'Impact was measured only through attendance numbers',
                d: 'No systematic evaluation methodology was employed'
            },
            correct: 'a'
        },
        {
            id: 'q12',
            question: 'How did weather rescheduling demonstrate adaptive project management?',
            options: {
                a: 'Flexible rescheduling ensured paint quality and visibility standards',
                b: 'Weather conditions did not affect any project activities',
                c: 'The team proceeded with activities regardless of weather',
                d: 'All outdoor activities were cancelled permanently'
            },
            correct: 'a'
        }
    ];
    
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    const questionsPerPage = 3;
    
    // Shuffle array function
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    // Shuffle options within a question
    function shuffleOptions(question) {
        const options = Object.keys(question.options);
        const shuffled = shuffleArray(options);
        const newOptions = {};
        shuffled.forEach((key, index) => {
            newOptions[String.fromCharCode(97 + index)] = question.options[key];
        });
        // Find new correct answer position
        const oldCorrectIndex = options.indexOf(question.correct);
        const newCorrect = String.fromCharCode(97 + shuffled.indexOf(question.correct));
        return { options: newOptions, correct: newCorrect };
    }
    
    // Select random 3 questions from pool
    function selectRandomQuestions() {
        const shuffled = shuffleArray(questionPool);
        return shuffled.slice(0, questionsPerPage);
    }
    
    // Render questions
    function renderQuestions(questions) {
        const quizForm = document.getElementById('quiz-form');
        const questionsContainer = document.getElementById('questions-container');
        
        questionsContainer.innerHTML = '';
        
        questions.forEach((q, index) => {
            const shuffled = shuffleOptions(q);
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.innerHTML = `
                <h3 class="question-title">${index + 1}. ${q.question}</h3>
                <div class="quiz-options">
                    ${Object.keys(shuffled.options).map(key => `
                        <label class="quiz-option">
                            <input type="radio" name="${q.id}" value="${key}">
                            <span>${shuffled.options[key]}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="feedback-${q.id}"></div>
            `;
            questionsContainer.appendChild(questionDiv);
            
            // Store correct answer
            q.displayCorrect = shuffled.correct;
        });
    }
    
    // Initialize quiz
    function initQuiz() {
        currentQuestions = selectRandomQuestions();
        currentQuestionIndex = 0;
        renderQuestions(currentQuestions);
    }
    
    // Check answers
    function checkAnswers() {
        let score = 0;
        const totalQuestions = currentQuestions.length;
        
        currentQuestions.forEach(q => {
            const selectedAnswer = document.querySelector(`input[name="${q.id}"]:checked`);
            const feedback = document.getElementById(`feedback-${q.id}`);
            
            if (selectedAnswer) {
                if (selectedAnswer.value === q.displayCorrect) {
                    score++;
                    feedback.textContent = '✓ Correct!';
                    feedback.className = 'quiz-feedback correct';
                } else {
                    feedback.textContent = '✗ Incorrect.';
                    feedback.className = 'quiz-feedback incorrect';
                }
            } else {
                feedback.textContent = 'Please select an answer.';
                feedback.className = 'quiz-feedback incorrect';
            }
        });
        
        // Show result
        const quizResult = document.getElementById('quiz-result');
        quizResult.className = 'quiz-result show';
        if (score === totalQuestions) {
            quizResult.className += ' success';
            quizResult.textContent = `Perfect! You got ${score}/${totalQuestions} correct! 🎉`;
        } else if (score >= totalQuestions / 2) {
            quizResult.className += ' partial';
            quizResult.textContent = `Good job! You got ${score}/${totalQuestions} correct. Keep learning!`;
        } else {
            quizResult.className += ' incorrect';
            quizResult.textContent = `You got ${score}/${totalQuestions} correct. Review the content and try again!`;
        }
    }
    
    // Reset quiz with shuffling
    function resetQuiz() {
        const quizForm = document.getElementById('quiz-form');
        const quizResult = document.getElementById('quiz-result');
        
        // Select new random questions and shuffle answers
        currentQuestions = selectRandomQuestions();
        renderQuestions(currentQuestions);
        
        // Clear feedback
        currentQuestions.forEach(q => {
            const feedback = document.getElementById(`feedback-${q.id}`);
            if (feedback) {
                feedback.textContent = '';
                feedback.className = 'quiz-feedback';
            }
        });
        
        quizResult.className = 'quiz-result';
        quizResult.textContent = '';
    }
    
    // Event listeners
    document.addEventListener('DOMContentLoaded', function() {
        const checkQuizBtn = document.getElementById('check-quiz');
        const resetQuizBtn = document.getElementById('reset-quiz');
        
        if (checkQuizBtn) {
            checkQuizBtn.addEventListener('click', checkAnswers);
        }
        
        if (resetQuizBtn) {
            resetQuizBtn.addEventListener('click', resetQuiz);
        }
        
        // Initialize quiz
        initQuiz();
    });
    
    // Export for use in main.js if needed
    window.quizSystem = {
        initQuiz,
        checkAnswers,
        resetQuiz,
        getCurrentQuestions: () => currentQuestions
    };
    
})();

