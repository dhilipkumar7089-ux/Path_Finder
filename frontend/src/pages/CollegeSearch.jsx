import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collegeAPI } from '../utils/api'

const CollegeSearch = () => {
  const [colleges, setColleges] = useState([])
  const [districts, setDistricts] = useState([])
  const [filters, setFilters] = useState({
    district: '',
    student_cutoff: '',
    student_category: 'OC'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    fetchDistricts()
    if (user.cutoff_mark) {
      setFilters(prev => ({
        ...prev,
        student_cutoff: user.cutoff_mark,
        student_category: user.category || 'OC'
      }))
    }
  }, [])

  useEffect(() => {
    fetchColleges()
  }, [filters])

  const fetchDistricts = async () => {
    try {
      const response = await collegeAPI.getDistricts()
      setDistricts(response.data)
    } catch (err) {
      console.error('Failed to fetch districts:', err)
    }
  }

  const fetchColleges = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.district) params.district = filters.district
      if (filters.student_cutoff) params.student_cutoff = filters.student_cutoff
      if (filters.student_category) params.student_category = filters.student_category

      const response = await collegeAPI.getColleges(params)
      setColleges(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load colleges. Please try again.')
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Explore Colleges 🏫
        </h1>
        <p className="text-xl text-gray-600">
          Find the perfect college based on your preferences and eligibility
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Colleges</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Cutoff Mark
            </label>
            <input
              name="student_cutoff"
              type="number"
              step="0.01"
              value={filters.student_cutoff}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="185.50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Category
            </label>
            <select
              name="student_category"
              value={filters.student_category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="OC">OC</option>
              <option value="BC">BC</option>
              <option value="BCM">BCM</option>
              <option value="MBC">MBC</option>
              <option value="SC">SC</option>
              <option value="SCA">SCA</option>
              <option value="ST">ST</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ district: '', student_cutoff: user.cutoff_mark || '', student_category: user.category || 'OC' })}
              className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-2xl text-primary">Loading colleges...</div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {college.image1 && (
                <img
                  src={college.image1}
                  alt={college.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {college.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <span>📍 {college.district}</span>
                  <span>•</span>
                  <span>{college.state}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {college.description}
                </p>

                {college.courses && college.courses.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">
                      Available Courses:
                    </div>
                    <div className="space-y-1">
                      {college.courses.slice(0, 3).map((course) => (
                        <div
                          key={course.id}
                          className={`text-sm flex items-center justify-between ${
                            course.eligible === true ? 'text-green-600' :
                            course.eligible === false ? 'text-red-600' :
                            'text-gray-600'
                          }`}
                        >
                          <span>{course.name}</span>
                          {course.eligible !== null && (
                            <span className="text-xs">
                              {course.eligible ? '✓ Eligible' : '✗ Not Eligible'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  to={`/colleges/${college.id}`}
                  className="inline-block w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && colleges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No colleges found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  )
}

export default CollegeSearch
