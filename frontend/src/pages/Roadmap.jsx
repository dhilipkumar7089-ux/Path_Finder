import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { roadmapAPI } from '../utils/api'

const Roadmap = () => {
  const { courseId } = useParams()
  const [roadmap, setRoadmap] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRoadmap()
  }, [courseId])

  const fetchRoadmap = async () => {
    try {
      const response = await roadmapAPI.getRoadmap(courseId)
      setRoadmap(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load roadmap. Please try again.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary">Loading roadmap...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Career Roadmap 🗺️
        </h1>
        <p className="text-xl text-gray-600">
          Your step-by-step guide to success in this course
        </p>
      </div>

      {roadmap.length > 0 ? (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {roadmap.map((step, index) => (
              <div key={step.id} className="relative flex items-start pl-20">
                {/* Timeline Dot */}
                <div className={`absolute left-5 w-6 h-6 rounded-full border-4 ${
                  index === 0 ? 'bg-primary border-primary' :
                  index === roadmap.length - 1 ? 'bg-secondary border-secondary' :
                  'bg-white border-primary'
                }`}></div>

                {/* Content Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full mb-2">
                        Step {step.step_number}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.step_title}
                      </h3>
                    </div>
                    {step.duration && (
                      <span className="bg-warm text-gray-700 px-3 py-1 rounded-full text-sm">
                        ⏱️ {step.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.step_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No roadmap available
          </h3>
          <p className="text-gray-600">
            Career roadmap for this course is coming soon!
          </p>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/colleges"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Explore More Colleges
        </Link>
      </div>
    </div>
  )
}

export default Roadmap
