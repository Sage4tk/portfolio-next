"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
            Something went wrong
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto mb-6">
            An unexpected error occurred while loading this page. Don't worry,
            it's not your fault.
          </p>

          {/* Error Details for Development */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-left text-sm text-gray-700 dark:text-gray-300 mb-8">
              <strong>Error:</strong> {error.message}
              {error.digest && (
                <div className="mt-2">
                  <strong>Error ID:</strong> {error.digest}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={reset}
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 hover:scale-105"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
          >
            Back to Portfolio
          </Link>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            If this problem persists, please let me know:
          </p>
          <Link
            href="/#contact"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
