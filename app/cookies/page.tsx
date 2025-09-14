export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Cookie Settings
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your cookie preferences and understand how we use cookies to improve your experience on LVRXchange.
            </p>
          </div>
        </div>
      </div>

      {/* Cookie Settings */}
      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Essential Cookies */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Authentication and session management</li>
                  <li>• Security and fraud prevention</li>
                  <li>• Load balancing and performance</li>
                  <li>• Accessibility preferences</li>
                </ul>
              </div>
              <div className="ml-4">
                <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">
                  Always On
                </div>
              </div>
            </div>
          </div>

          {/* Functional Cookies */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Functional Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• User interface preferences</li>
                  <li>• Search filters and sorting options</li>
                  <li>• Display settings and themes</li>
                  <li>• Language and region preferences</li>
                </ul>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Performance Cookies */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Page load times and performance metrics</li>
                  <li>• Error tracking and debugging</li>
                  <li>• Feature usage and interaction patterns</li>
                  <li>• Site optimization and improvements</li>
                </ul>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Marketing Cookies</h3>
                <p className="text-gray-600 mb-4">
                  These cookies are used to deliver relevant advertisements and track the effectiveness of marketing campaigns.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Targeted advertising and remarketing</li>
                  <li>• Social media integration</li>
                  <li>• Campaign performance tracking</li>
                  <li>• Cross-platform user identification</li>
                </ul>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Save Preferences
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Accept All
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Reject All
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Information */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Cookies</h2>

          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What are cookies?</h3>
                <p className="text-gray-600 mb-6">
                  Cookies are small text files that are stored on your device when you visit our website.
                  They help us provide you with a better experience by remembering your preferences and
                  understanding how you use our platform.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Why do we use cookies?</h3>
                <p className="text-gray-600">
                  We use cookies to improve your experience on LVRXchange, provide personalized content,
                  analyze site performance, and ensure our platform works properly. We're committed to
                  being transparent about our cookie usage.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Managing your preferences</h3>
                <p className="text-gray-600 mb-6">
                  You can control and customize your cookie settings at any time using the options above.
                  Your preferences will be saved and applied to your future visits to LVRXchange.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Browser settings</h3>
                <p className="text-gray-600">
                  You can also manage cookies through your browser settings. However, disabling certain
                  cookies may affect the functionality of our website and your overall experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions about cookies?</h2>
          <p className="text-xl text-gray-600 mb-8">
            If you have any questions about our use of cookies or this cookie policy, please contact us.
          </p>
          <a
            href="mailto:privacy@levrxchange.com?subject=Cookie Policy Question"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}