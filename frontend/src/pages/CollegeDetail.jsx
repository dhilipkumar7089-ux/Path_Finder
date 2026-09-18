import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { collegeAPI } from '../utils/api'

const CollegeDetail = () => {
  const { id } = useParams()
  const [college, setCollege] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    fetchCollege()
  }, [id])

  const fetchCollege = async () => {
    try {
      const response = await collegeAPI.getCollege(id)
      setCollege(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load college details. Please try again.')
      setLoading(false)
    }
  }

  const handleBookmark = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login to bookmark colleges')
      return
    }

    try {
      if (bookmarked) {
        await collegeAPI.removeBookmark(id)
        setBookmarked(false)
      } else {
        await collegeAPI.bookmarkCollege(id)
        setBookmarked(true)
      }
    } catch (err) {
      console.error('Bookmark error:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-primary">Loading college details...</div>
      </div>
    )
  }

  if (error || !college) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'College not found'}
        </div>
      </div>
    )
  }

  const images = [college.image1, college.image2, college.image3].filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        to="/colleges"
        className="inline-flex items-center text-primary hover:text-indigo-700 mb-6"
      >
        ← Back to Colleges
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {college.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>📍 {college.district}, {college.state}</span>
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit Website →
                </a>
              )}
            </div>
          </div>
          <button
            onClick={handleBookmark}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              bookmarked
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-primary text-white hover:bg-indigo-700'
            }`}
          >
            {bookmarked ? '♥ Bookmarked' : '♡ Bookmark'}
          </button>
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="mb-6">
            <div className="mb-4">
              <img
                src={images[selectedImage]}
                alt={`${college.name} - Image ${selectedImage + 1}`}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-16 object-cover rounded-lg border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{college.description}</p>
        </div>

        {/* Infrastructure */}
        {college.infrastructure && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Infrastructure</h2>
            <p className="text-gray-600 leading-relaxed">{college.infrastructure}</p>
          </div>
        )}
      </div>

      {/* Courses and Cutoffs */}
      {college.courses && college.courses.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Courses & Cutoff Marks
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Domain</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Duration</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cutoff</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Seats</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {college.courses.map((course) => (
                  <>
                    {course.cutoffs && course.cutoffs.map((cutoff, idx) => (
                      <tr key={`${course.id}-${idx}`} className="border-t border-gray-200">
                        {idx === 0 && (
                          <>
                            <td className="px-4 py-4 font-medium text-gray-900" rowSpan={course.cutoffs.length}>
                              {course.name}
                            </td>
                            <td className="px-4 py-4 text-gray-600" rowSpan={course.cutoffs.length}>
                              <span className="capitalize bg-gray-100 px-2 py-1 rounded text-sm">
                                {course.domain}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-gray-600" rowSpan={course.cutoffs.length}>
                              {course.duration}
                            </td>
                          </>
                        )}
                        <td className="px-4 py-4 text-gray-600">{cutoff.category}</td>
                        <td className="px-4 py-4 font-semibold text-gray-900">{cutoff.cutoff}</td>
                        <td className="px-4 py-4 text-gray-600">{cutoff.seats}</td>
                        {idx === 0 && (
                          <td className="px-4 py-4" rowSpan={course.cutoffs.length}>
                            <Link
                              to={`/roadmap/${course.id}`}
                              className="inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
                            >
                              View Roadmap
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default CollegeDetail
