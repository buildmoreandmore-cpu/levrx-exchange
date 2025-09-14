import Link from "next/link";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Join Our Mission
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Help us revolutionize real estate by finding innovative solutions to complex problems.
              We're building the future of property investment and exchange.
            </p>
          </div>
        </div>
      </div>

      {/* Company Culture */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Culture: Solution-Driven Innovation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At LVRXchange, we believe every challenge is an opportunity waiting for the right solution.
                Our team thrives on identifying problems in the real estate industry and crafting innovative,
                AI-powered solutions that create real value for our users.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Problem-First Thinking</h3>
                    <p className="text-gray-600">We start by deeply understanding the challenges our users face, then build solutions that matter.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Collaborative Innovation</h3>
                    <p className="text-gray-600">Great solutions emerge from diverse perspectives working together toward a common goal.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Continuous Learning</h3>
                    <p className="text-gray-600">We stay curious, embrace new technologies, and continuously evolve our approaches.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">L</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Why LVRXchange?</h3>
                <p className="text-gray-600">
                  Join a team that's reshaping how real estate investors discover, evaluate, and exchange opportunities through cutting-edge AI technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Ready to solve real estate's biggest challenges with us?</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Junior Software Developer</h3>
                  <p className="text-gray-600">Full-time • Remote/Hybrid</p>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Open
                </span>
              </div>

              <p className="text-gray-600 mb-6">
                Join our development team to build innovative solutions for real estate professionals.
                You'll work on AI-powered matching algorithms, user interfaces, and backend systems
                that connect investors with opportunities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What you'll do:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Develop and maintain web applications using modern frameworks</li>
                    <li>• Collaborate on AI-powered matching algorithms</li>
                    <li>• Build responsive user interfaces and experiences</li>
                    <li>• Contribute to database design and optimization</li>
                    <li>• Participate in code reviews and team problem-solving sessions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What we're looking for:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 1-3 years of software development experience</li>
                    <li>• Proficiency in JavaScript/TypeScript and React</li>
                    <li>• Experience with modern web development tools</li>
                    <li>• Problem-solving mindset and attention to detail</li>
                    <li>• Passion for creating user-focused solutions</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="mailto:careers@levrxchange.com?subject=Junior Software Developer Application"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </Link>
                <Link
                  href="mailto:careers@levrxchange.com?subject=Junior Software Developer - Questions"
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Ask Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Hiring Process</h2>
            <p className="text-xl text-gray-600">We keep it simple and focused on finding the right fit.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Apply</h3>
                <p className="text-gray-600">Send us your resume and a brief note about what problems you're excited to solve.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Interview</h3>
                <p className="text-gray-600">Chat with our team about your experience and how you approach problem-solving.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Join</h3>
                <p className="text-gray-600">Welcome to the team! Start solving real estate's biggest challenges with us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't see the right role?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're always looking for talented problem-solvers. Send us your information and let's talk.
          </p>
          <Link
            href="mailto:careers@levrxchange.com?subject=Future Opportunities"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}