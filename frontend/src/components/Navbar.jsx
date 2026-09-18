import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))

  useEffect(() => {
    const checkAuth = () => {
      setToken(localStorage.getItem('token'))
      setUser(JSON.parse(localStorage.getItem('user') || '{}'))
    }

    // Check auth on mount
    checkAuth()
    
    // Listen for custom login/logout events
    const handleAuthChange = () => {
      checkAuth()
    }
    
    window.addEventListener('auth-change', handleAuthChange)
    
    return () => window.removeEventListener('auth-change', handleAuthChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser({})
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              🎓 Path-Finder
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link to="/quiz" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              Quiz
            </Link>
            <Link to="/colleges" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
              Colleges
            </Link>
            
            {token ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
