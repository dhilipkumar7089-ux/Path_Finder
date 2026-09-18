import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { authAPI, collegeAPI } from '../utils/api'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfile()
    fetchBookmarks()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile()
      setUser(response.data)
    } catch (err) {
      setError('Failed to load profile. Please try again.')
    }
  }

  const fetchBookmarks = async () => {
    try {
      const response = await collegeAPI.getBookmarks()
      setBookmarks(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch bookmarks:', err)
      setLoading(false)
    }
  }

  const handleRemoveBookmark = async (collegeId) => {
    try {
      await collegeAPI.removeBookmark(collegeId)
      setBookmarks(bookmarks.filter(b => b.id !== collegeId))
    } catch (err) {
      console.error('Failed to remove bookmark:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Profile 👤
        </h1>
        <p className="text-xl text-gray-600">
          Manage your account and saved colleges
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-4xl text-white mb-4">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Cutoff Mark</span>
                <span className="font-semibold text-gray-900">{user?.cutoff_mark}/200</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Category</span>
                <span className="font-semibold text-gray-900">{user?.category}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">District</span>
                <span className="font-semibold text-gray-900">{user?.district}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Bookmarked Colleges */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Saved Colleges ❤️ ({bookmarks.length})
            </h2>

            {bookmarks.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {bookmarks.map((college) => (
                  <div
                    key={college.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                  >
                    {college.image1 && (
                      <img
                        src={college.image1}
                        alt={college.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <span>📍 {college.district}</span>
                      <span>•</span>
                      <span>{college.state}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/colleges/${college.id}`}
                        className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-center text-sm"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemoveBookmark(college.id)}
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No saved colleges yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start exploring and bookmark your favorite colleges!
                </p>
                <Link
                  to="/colleges"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  Explore Colleges
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Link
          to="/quiz"
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
        >
          <div className="text-4xl mb-3">🧠</div>
          <h3 className="font-semibold text-gray-900">Retake Quiz</h3>
          <p className="text-sm text-gray-600">Discover your career interests</p>
        </Link>
        <Link
          to="/results"
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
        >
          <div className="text-4xl mb-3">📊</div>
          <h3 className="font-semibold text-gray-900">View Results</h3>
          <p className="text-sm text-gray-600">See your quiz results</p>
        </Link>
        <Link
          to="/colleges"
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center"
        >
          <div className="text-4xl mb-3">🏫</div>
          <h3 className="font-semibold text-gray-900">Explore Colleges</h3>
          <p className="text-sm text-gray-600">Find your perfect college</p>
        </Link>
      </div>
    </div>
  )
}

export default Profile
