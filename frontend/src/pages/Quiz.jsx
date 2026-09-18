import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { quizAPI } from '../utils/api'

const Quiz = () => {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await quizAPI.getQuestions()
      setQuestions(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load questions. Please try again.')
      setLoading(false)
    }
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    })
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      setError('Please answer all questions before submitting.')
      return
    }

    const answersArray = Object.keys(answers).map(questionId => ({
      question_id: parseInt(questionId),
      selected_answer: answers[questionId]
    }))

    try {
      await quizAPI.submitQuiz(answersArray)
      navigate('/results')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit quiz. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary">Loading quiz...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Career Interest Quiz 🧠
        </h1>
        <p className="text-xl text-gray-600">
          Answer these questions to discover which career path suits you best
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-6">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Question {index + 1} of {questions.length}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                {question.question}
              </h3>
              <span className="inline-block mt-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {question.domain}
              </span>
            </div>

            <div className="space-y-3">
              {[
                { key: 'A', text: question.option_a },
                { key: 'B', text: question.option_b },
                { key: 'C', text: question.option_c },
                { key: 'D', text: question.option_d }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleAnswer(question.id, option.key)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    answers[question.id] === option.key
                      ? 'border-primary bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-semibold text-gray-700 mr-3">
                    {option.key}.
                  </span>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition text-lg"
        >
          Submit Quiz & See Results
        </button>
      </div>
    </div>
  )
}

export default Quiz
