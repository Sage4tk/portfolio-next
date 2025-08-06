import Head from "next/head";
// import { useState } from "react";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Timothy Timbol
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#work"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 dark:text-white mb-6 tracking-tight">
            Hello, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Timothy Timbol
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            A passionate developer creating beautiful digital experiences with
            clean code and thoughtful design based in Dubai, United Arab
            Emirates
            <img
              src="https://flagcdn.com/w40/ae.png"
              alt="UAE Flag"
              width="40"
              height="30"
              className="inline-block ml-2"
              style={{ borderRadius: "2px" }}
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#work"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <ProjectsSection />

      {/* About Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950" id="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-8">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
            I'm a developer with 3 years of experience who believes in the power
            of clean, efficient code and beautiful design. With expertise in
            modern web technologies, I create digital experiences that are both
            functional and delightful to use. I have been featured in
            prestigious events and publications such as <strong>Gitex</strong>{" "}
            and <strong>Gulf News</strong>, showcasing my contributions to the
            tech industry.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">💻</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Development
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Modern web technologies
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Clean and intuitive interfaces
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Performance
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Fast and optimized solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6" id="skills">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-8">
              Technologies I Work With
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              I stay up-to-date with the latest technologies to deliver modern,
              scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Frontend */}
            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-blue-500 rounded-xl mb-4 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <span className="text-white font-bold">⚛️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                React
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Modern UI library
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-xl mb-4 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <span className="text-white font-bold">TS</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                TypeScript
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Type-safe JavaScript
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-xl mb-4 flex items-center justify-center group-hover:bg-gray-800 dark:group-hover:bg-gray-200 transition-colors">
                <span className="text-white dark:text-black font-bold">▲</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Next.js
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                React framework
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-blue-500 rounded-xl mb-4 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <span className="text-white font-bold">RN</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                React Native
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Mobile development
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl mb-4 flex items-center justify-center group-hover:bg-cyan-600 transition-colors">
                <span className="text-white font-bold">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Tailwind CSS
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Utility-first CSS
              </p>
            </div>

            {/* Backend & Database */}
            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-green-600 rounded-xl mb-4 flex items-center justify-center group-hover:bg-green-700 transition-colors">
                <span className="text-white font-bold">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Supabase
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Backend as a service
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-orange-500 rounded-xl mb-4 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <span className="text-white font-bold">🔥</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Firebase
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Google's platform
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-yellow-300 dark:hover:border-yellow-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl mb-4 flex items-center justify-center group-hover:bg-yellow-600 transition-colors">
                <span className="text-white font-bold">☁️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                AWS
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cloud computing
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-blue-500 rounded-xl mb-4 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <span className="text-white font-bold">GCP</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Google Cloud
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cloud platform
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-green-500 rounded-xl mb-4 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                <span className="text-white font-bold">⚙️</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Node.js
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Backend runtime
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-blue-600 rounded-xl mb-4 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <span className="text-white font-bold">SQL</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                SQL
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Relational databases
              </p>
            </div>

            <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <div className="w-12 h-12 bg-purple-500 rounded-xl mb-4 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <span className="text-white font-bold">📄</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                NoSQL
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Document databases
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6" id="contact">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-8">
            Let's Work Together
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Have a project in mind? I'd love to hear about it and discuss how we
            can bring your ideas to life.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
              © 2025 Timothy Zack Timbol. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/Sage4tk#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/timothy-zack-timbol-90b5271b6/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/cactusz4ck"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
