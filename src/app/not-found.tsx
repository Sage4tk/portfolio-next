import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-light text-gray-200 dark:text-gray-800 leading-none select-none">
            404
          </h1>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back to exploring my work.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/"
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 hover:scale-105"
          >
            Back to Portfolio
          </Link>
          <Link
            href="/projects"
            className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
          >
            View Projects
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-8 opacity-30">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Navigation Suggestions */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/#work"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Featured Work
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              href="/#about"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              About Me
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              href="/#skills"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Skills
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              href="/#contact"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
