import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { quizAPI } from '../utils/api'

const Results = () => {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const response = await quizAPI.getResults()
      if (response.data.taken) {
        setResults(response.data)
      } else {
        setError('You haven\'t taken the quiz yet. Please take the quiz first.')
      }
      setLoading(false)
    } catch (err) {
      setError('Failed to load results. Please try again.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary">Loading results...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <Link
          to="/quiz"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Take Quiz
        </Link>
      </div>
    )
  }

  const domainColors = {
    engineering: 'bg-blue-100 text-blue-800',
    medical: 'bg-green-100 text-green-800',
    commerce: 'bg-yellow-100 text-yellow-800',
    arts: 'bg-purple-100 text-purple-800'
  }

  const domainIcons = {
    engineering: '⚙️',
    medical: '🏥',
    commerce: '💼',
    arts: '🎨'
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Quiz Results 🎉
        </h1>
        <p className="text-xl text-gray-600">
          Based on your answers, here's your career interest profile
        </p>
      </div>

      {/* Domain Scores */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Interest Scores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(results.domainScores).map(([domain, score]) => (
            <div
              key={domain}
              className={`p-4 rounded-xl ${domain === results.topDomain ? 'ring-4 ring-primary' : ''}`}
            >
              <div className="text-3xl mb-2">{domainIcons[domain]}</div>
              <div className="font-semibold text-gray-800 capitalize">{domain}</div>
              <div className="text-2xl font-bold text-primary">{score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Domain */}
      <div className="bg-gradient-to-r from-primary to-indigo-600 text-white p-8 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Top Domain</h2>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{domainIcons[results.topDomain]}</span>
          <div>
            <div className="text-3xl font-bold capitalize">{results.topDomain}</div>
            <div className="text-indigo-100">
              You scored highest in this domain. Consider exploring courses in this field!
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Courses */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Suggested Courses for You
        </h2>
        {results.suggestedCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {results.suggestedCourses.map((course) => (
              <div
                key={course.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {course.name}
                    </h3>
                    <p className="text-gray-600">{course.college_name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${domainColors[course.domain]}`}>
                    {course.domain}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>📍 {course.district}</span>
                  <span>⏱️ {course.duration}</span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <Link
                  to={`/roadmap/${course.id}`}
                  className="inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
                >
                  View Career Roadmap
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No courses found in your top domain.</p>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/colleges"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Explore All Colleges
        </Link>
      </div>
    </div>
  )
}

export default Results
