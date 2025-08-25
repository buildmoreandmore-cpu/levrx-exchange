import Link from 'next/link'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">L</span>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          LevrX Demo
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Experience the future of real estate deal-making with our interactive demo.
        </p>
        
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <p className="text-gray-600 mb-6">
            The demo environment is coming soon. For now, you can explore the live dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-in"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Try Live Platform
            </Link>
            <Link
              href="/"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:shadow-md transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Questions? <a href="mailto:sales@levrx.app" className="text-blue-600 hover:text-blue-700 underline">Contact sales</a></p>
        </div>
      </div>
    </div>
  )
}