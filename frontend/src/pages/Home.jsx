import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Perfect College Path 🎯
          </h1>
          <p className="text-xl mb-8 text-indigo-100">
            Discover the best colleges and courses based on your interests, cutoff marks, and career goals
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/quiz"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition text-lg"
            >
              Take Career Quiz
            </Link>
            <Link
              to="/colleges"
              className="bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition text-lg"
            >
              Explore Colleges
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How Path-Finder Helps You
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-warm rounded-xl">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Career Quiz</h3>
              <p className="text-gray-600">
                Take our interactive quiz to discover which career path suits you best
              </p>
            </div>
            <div className="text-center p-6 bg-warm rounded-xl">
              <div className="text-5xl mb-4">🏫</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">College Directory</h3>
              <p className="text-gray-600">
                Browse detailed information about top colleges with cutoff marks and seat availability
              </p>
            </div>
            <div className="text-center p-6 bg-warm rounded-xl">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Career Roadmaps</h3>
              <p className="text-gray-600">
                Visual step-by-step guides to help you plan your career journey
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-secondary to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-green-100">
            Register now to save your preferences and bookmark your favorite colleges
          </p>
          <Link
            to="/register"
            className="bg-white text-secondary px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition text-lg"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Path-Finder. Helping students find their perfect college path.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
