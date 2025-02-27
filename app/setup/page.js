'use client';
import { useState } from "react";
import { ConfettiButton } from "@/components/confetti";
import Link from 'next/link';

export default function Setup() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 'wakeTime',
      question: 'What time do you usually wake up?',
      description: 'Helps set the start of your daily timeline.',
      type: 'time'
    },
    {
      id: 'bedTime',
      question: 'What time do you usually go to bed?',
      description: 'Defines the end of your daily schedule.',
      type: 'time'
    },
    {
      id: 'habits',
      question: 'Do you have any recurring habits or activities?',
      description: 'e.g., morning workouts, meditation, or specific mealtimes.',
      type: 'text'
    },
    {
      id: 'priorities',
      question: 'What are your top priorities for most days?',
      description: 'e.g., work, study, personal projects, or family time.',
      type: 'text'
    },
    {
      id: 'freeTime',
      question: 'How much free time do you like to have each day?',
      description: 'Helps balance tasks and leisure in your schedule.',
      type: 'text'
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      console.log('All questions answered:', answers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-3xl font-bold text-green-600">🎉 Congratulations!</h1>
          <p className="text-xl">You've successfully completed your schedule setup.</p>
          <p className="text-gray-600">Your preferences have been saved and your schedule is ready to go.</p>
          <Link 
            href="/dashboard" 
            className="inline-block mt-6 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Let's set up your schedule</h1>
          <div className="mb-8">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{currentQuestion.question}</h2>
          <p className="text-gray-600 mb-4">{currentQuestion.description}</p>
          
          {currentQuestion.type === 'time' ? (
            <input
              type="time"
              className="w-full p-2 border rounded"
            />
          ) : (
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Your answer"
              
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer(e.target.value);
                }
              }}
            />
          )}

          <ConfettiButton
            onClick={(e) => {
              // Get the input value before the confetti animation
              const inputValue = document.querySelector('input').value;
              // Small delay to allow confetti to start before transition
              setTimeout(() => handleAnswer(inputValue), 100);
            }}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </ConfettiButton>
        </div>
      </div>
    </div>
  );
}