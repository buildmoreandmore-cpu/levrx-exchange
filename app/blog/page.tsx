import Link from "next/link";

export default function BlogPage() {
  const blogPosts = [
    {
      id: "creative-financing-2025",
      title: "Creative Financing Solutions Reshaping Real Estate in 2025",
      excerpt: "Discover how innovative financing structures are helping investors overcome traditional lending barriers and unlock new opportunities in today's market.",
      author: "LVRXchange Team",
      date: "September 13, 2025",
      category: "Market Insights",
      readTime: "6 min read",
      image: "/api/placeholder/600/300",
      tags: ["Creative Financing", "Market Trends", "Investment Strategy"]
    },
    {
      id: "ai-powered-matching",
      title: "How AI is Revolutionizing Property Investment Matching",
      excerpt: "Learn about the machine learning algorithms that power LVRXchange's matching system and how they're creating better outcomes for investors.",
      author: "LVRXchange Team",
      date: "September 10, 2025",
      category: "Technology",
      readTime: "8 min read",
      image: "/api/placeholder/600/300",
      tags: ["AI Technology", "Machine Learning", "PropTech"]
    },
    {
      id: "market-volatility-opportunities",
      title: "Finding Opportunities in Market Volatility: A 2025 Perspective",
      excerpt: "Market uncertainty creates unique opportunities for savvy investors. Here's how to identify and capitalize on them using data-driven approaches.",
      author: "LVRXchange Team",
      date: "September 8, 2025",
      category: "Investment Strategy",
      readTime: "7 min read",
      image: "/api/placeholder/600/300",
      tags: ["Market Analysis", "Investment Strategy", "Risk Management"]
    },
    {
      id: "platform-updates-q3",
      title: "Q3 2025 Platform Updates: New Features & Improvements",
      excerpt: "See what's new in LVRXchange this quarter, including enhanced matching algorithms, improved user interface, and expanded market data integration.",
      author: "LVRXchange Team",
      date: "September 5, 2025",
      category: "Product Updates",
      readTime: "4 min read",
      image: "/api/placeholder/600/300",
      tags: ["Product Updates", "New Features", "User Experience"]
    },
    {
      id: "creative-real-estate-solutions",
      title: "Why Creative Real Estate Solutions Are Essential in Today's Market",
      excerpt: "Traditional real estate approaches aren't enough anymore. Explore how creative strategies are solving problems that conventional methods can't address.",
      author: "LVRXchange Team",
      date: "September 3, 2025",
      category: "Industry Analysis",
      readTime: "9 min read",
      image: "/api/placeholder/600/300",
      tags: ["Creative Solutions", "Problem Solving", "Market Innovation"]
    },
    {
      id: "data-driven-investing",
      title: "The Power of Data-Driven Real Estate Investment Decisions",
      excerpt: "How modern investors are using advanced analytics and market data to make smarter investment decisions and reduce risk in uncertain times.",
      author: "LVRXchange Team",
      date: "August 30, 2025",
      category: "Data & Analytics",
      readTime: "5 min read",
      image: "/api/placeholder/600/300",
      tags: ["Data Analytics", "Investment Strategy", "Risk Assessment"]
    }
  ];

  const categories = ["All", "Market Insights", "Technology", "Investment Strategy", "Product Updates", "Industry Analysis", "Data & Analytics"];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              LVRXchange Blog
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, trends, and innovations in real estate technology.
              Stay informed about market dynamics, creative solutions, and platform updates.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-blue-600 font-semibold">Featured Post</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Featured Article</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Market Insights
                </span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-500 text-sm">6 min read</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{blogPosts[0].author}</p>
                    <p className="text-sm text-gray-500">{blogPosts[0].date}</p>
                  </div>
                </div>
                <Link
                  href={`/blog/${blogPosts[0].id}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
                    </svg>
                    <p className="text-sm">Article Image</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      post.category === "Technology" ? "bg-purple-100 text-purple-800" :
                      post.category === "Investment Strategy" ? "bg-green-100 text-green-800" :
                      post.category === "Product Updates" ? "bg-orange-100 text-orange-800" :
                      post.category === "Industry Analysis" ? "bg-red-100 text-red-800" :
                      post.category === "Data & Analytics" ? "bg-indigo-100 text-indigo-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">L</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest insights on real estate trends, technology updates, and creative solutions delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}