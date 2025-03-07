import { useState, useEffect, useCallback } from 'react';

function QuizPage() {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  
  const quizzes = [
    {
      id: 'solar-system',
      title: 'Solar System Quiz',
      description: 'Test your knowledge about our Solar System!',
      image: '/api/placeholder/400/300',
      questions: [
        {
          question: 'Which planet is known as the Red Planet?',
          options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
          answer: 1,
          explanation: 'Mars is often called the "Red Planet" because the iron oxide prevalent on its surface gives it a reddish appearance.'
        },
        {
          question: 'Which is the largest planet in our Solar System?',
          options: ['Earth', 'Saturn', 'Jupiter', 'Neptune'],
          answer: 2,
          explanation: 'Jupiter is the largest planet in our Solar System. It has a diameter of about 86,881 miles (139,822 km).'
        },
        {
          question: 'How many planets are in our Solar System?',
          options: ['7', '8', '9', '10'],
          answer: 1,
          explanation: 'There are 8 planets in our Solar System: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto was reclassified as a dwarf planet in 2006.'
        },
        {
          question: 'Which planet has the most moons?',
          options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
          answer: 1,
          explanation: 'Saturn has the most confirmed moons with 83 moons. Jupiter is second with 79 known moons.'
        },
        {
          question: 'Which planet is closest to the Sun?',
          options: ['Mercury', 'Venus', 'Earth', 'Mars'],
          answer: 0,
          explanation: 'Mercury is the closest planet to the Sun, at an average distance of 36 million miles (58 million km).'
        }
      ]
    },
    {
      id: 'space-exploration',
      title: 'Space Exploration Quiz',
      description: 'Test your knowledge about human space exploration!',
      image: '/api/placeholder/400/300',
      questions: [
        {
          question: 'Who was the first human to walk on the Moon?',
          options: ['Buzz Aldrin', 'Neil Armstrong', 'Michael Collins', 'Yuri Gagarin'],
          answer: 1,
          explanation: 'Neil Armstrong was the first human to walk on the Moon on July 20, 1969, during the Apollo 11 mission.'
        },
        {
          question: 'Which space agency launched the Hubble Space Telescope?',
          options: ['ESA', 'NASA', 'Roscosmos', 'JAXA'],
          answer: 1,
          explanation: 'NASA launched the Hubble Space Telescope on April 24, 1990, aboard the Space Shuttle Discovery.'
        },
        {
          question: 'What was the name of the first artificial satellite launched into Earth orbit?',
          options: ['Explorer 1', 'Vostok 1', 'Sputnik 1', 'Apollo 1'],
          answer: 2,
          explanation: 'Sputnik 1 was the first artificial satellite, launched by the Soviet Union on October 4, 1957.'
        },
        {
          question: 'Which spacecraft carried humans to the Moon?',
          options: ['Gemini', 'Mercury', 'Apollo', 'Soyuz'],
          answer: 2,
          explanation: 'The Apollo spacecraft carried astronauts to the Moon. Six Apollo missions landed humans on the Moon between 1969 and 1972.'
        },
        {
          question: 'Who was the first human in space?',
          options: ['Neil Armstrong', 'Yuri Gagarin', 'John Glenn', 'Alan Shepard'],
          answer: 1,
          explanation: 'Yuri Gagarin was the first human to journey into outer space. His spacecraft, Vostok 1, completed one orbit of Earth on April 12, 1961.'
        }
      ]
    }
  ];

  useEffect(() => {
    let timer;
    if (quizStarted && !showResults && !isAnswered && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(null);
    }
    
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResults, isAnswered, handleAnswer]);

  const startQuiz = (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setQuizStarted(true);
    setTimeLeft(30);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = useCallback((selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);
    
    if (selectedIndex === currentQuiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  }, [currentQuiz, currentQuestion, score]);

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setQuizStarted(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Space Quiz Challenge</h1>

      {!quizStarted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <img 
                src={quiz.image} 
                alt={quiz.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {quiz.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {quiz.questions.length} questions
                </p>
                <button 
                  onClick={() => startQuiz(quiz.id)}
                  className="btn-primary w-full"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : showResults ? (
        // Quiz Results UI
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <div className="text-6xl font-bold mb-6 text-space-accent">
            {score} / {currentQuiz.questions.length}
          </div>
          <p className="text-xl mb-8">
            {score === currentQuiz.questions.length 
              ? 'Perfect score! You\'re a space expert! 🚀' 
              : score >= currentQuiz.questions.length / 2 
                ? 'Well done! You have good knowledge about space! 🌟' 
                : 'Keep exploring and learning more about space! 🌌'}
          </p>
          <div className="flex space-x-4 justify-center">
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResults(false);
                setIsAnswered(false);
                setSelectedAnswer(null);
                setTimeLeft(30);
              }}
              className="btn-primary"
            >
              Try Again
            </button>
            <button 
              onClick={resetQuiz}
              className="btn-secondary"
            >
              Choose Different Quiz
            </button>
          </div>
        </div>
      ) : (
        // Quiz Questions UI
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-space-dark text-white p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{currentQuiz.title}</h2>
              <div className="text-sm">
                Question {currentQuestion + 1} of {currentQuiz.questions.length}
              </div>
            </div>
            <div className="w-full bg-gray-700 h-2 mt-2 rounded-full overflow-hidden">
              <div 
                className="bg-space-accent h-full rounded-full"
                style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Time remaining:</span>
              <span className={`text-sm font-bold ${timeLeft < 10 ? 'text-space-accent' : 'text-space-dark'}`}>
                {timeLeft} seconds
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 mb-6 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${timeLeft < 10 ? 'bg-space-accent' : 'bg-space-dark'}`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
            
            <h3 className="text-xl font-bold mb-6">
              {currentQuiz.questions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3 mb-6">
              {currentQuiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !isAnswered && handleAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    isAnswered 
                      ? index === currentQuiz.questions[currentQuestion].answer
                        ? 'bg-green-100 dark:bg-green-900 border-green-500'
                        : index === selectedAnswer
                          ? 'bg-red-100 dark:bg-red-900 border-red-500'
                          : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                      : selectedAnswer === index
                        ? 'bg-space-light text-white border-space-light'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold border
                      ${isAnswered 
                        ? index === currentQuiz.questions[currentQuestion].answer
                          ? 'bg-green-500 text-white border-green-500'
                          : index === selectedAnswer
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
                        : 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500'
                      }">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </button>
              ))}
            </div>
            
            {isAnswered && (
              <div className={`p-4 mb-6 rounded-lg ${
                selectedAnswer === currentQuiz.questions[currentQuestion].answer
                  ? 'bg-green-100 dark:bg-green-900 border border-green-500'
                  : 'bg-red-100 dark:bg-red-900 border border-red-500'
              }`}>
                <div className="font-bold mb-2">
                  {selectedAnswer === currentQuiz.questions[currentQuestion].answer
                    ? '✓ Correct!'
                    : '✗ Incorrect!'}
                </div>
                <p>{currentQuiz.questions[currentQuestion].explanation}</p>
              </div>
            )}
            
            <div className="flex justify-between">
              {isAnswered ? (
                <button 
                  onClick={nextQuestion}
                  className="btn-primary w-full"
                >
                  {currentQuestion < currentQuiz.questions.length - 1
                    ? 'Next Question'
                    : 'See Results'}
                </button>
              ) : (
                <button 
                  onClick={() => handleAnswer(null)}
                  className="btn-secondary w-full"
                >
                  Skip Question
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;