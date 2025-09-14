'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'outage'
  uptime: string
  responseTime: number
  description: string
}

interface Incident {
  id: string
  title: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  impact: 'minor' | 'major' | 'critical'
  date: string
  description: string
  updates: Array<{
    timestamp: string
    message: string
    status: string
  }>
}

// Mock data - in production, this would come from monitoring APIs
const services: ServiceStatus[] = [
  {
    name: 'Web Platform',
    status: 'operational',
    uptime: '99.98%',
    responseTime: 245,
    description: 'Main web application and user interface'
  },
  {
    name: 'API Services',
    status: 'operational',
    uptime: '99.95%',
    responseTime: 180,
    description: 'Backend API and data services'
  },
  {
    name: 'AI Matching Engine',
    status: 'operational',
    uptime: '99.92%',
    responseTime: 850,
    description: 'Property and investor matching algorithms'
  },
  {
    name: 'Database',
    status: 'operational',
    uptime: '99.99%',
    responseTime: 125,
    description: 'Primary database and data storage'
  },
  {
    name: 'Authentication',
    status: 'operational',
    uptime: '99.97%',
    responseTime: 95,
    description: 'User login and security services'
  },
  {
    name: 'Notifications',
    status: 'operational',
    uptime: '99.91%',
    responseTime: 320,
    description: 'Email and push notification delivery'
  }
]

const recentIncidents: Incident[] = [
  {
    id: '1',
    title: 'Resolved: Brief API slowdown during peak hours',
    status: 'resolved',
    impact: 'minor',
    date: '2025-01-09T15:30:00Z',
    description: 'Users experienced slower response times for API requests between 3:30 PM and 4:15 PM EST.',
    updates: [
      {
        timestamp: '2025-01-09T16:15:00Z',
        message: 'Issue has been fully resolved. All services are operating normally.',
        status: 'resolved'
      },
      {
        timestamp: '2025-01-09T15:45:00Z',
        message: 'We have identified the cause and are implementing a fix. Response times are improving.',
        status: 'identified'
      },
      {
        timestamp: '2025-01-09T15:30:00Z',
        message: 'We are investigating reports of slower API response times.',
        status: 'investigating'
      }
    ]
  }
]

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string | null>(null)

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-100'
      case 'degraded': return 'text-yellow-600 bg-yellow-100'
      case 'outage': return 'text-red-600 bg-red-100'
      case 'investigating': return 'text-orange-600 bg-orange-100'
      case 'identified': return 'text-blue-600 bg-blue-100'
      case 'monitoring': return 'text-purple-600 bg-purple-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'degraded':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      case 'outage':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
        )
    }
  }

  const overallStatus = services.every(s => s.status === 'operational') ? 'All Systems Operational' :
    services.some(s => s.status === 'outage') ? 'System Issues' : 'Degraded Performance'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">LVRXchange</h1>
            </Link>
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Status Overview */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            {services.every(s => s.status === 'operational') ? (
              <svg className="w-12 h-12 text-green-500 mr-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-12 h-12 text-yellow-500 mr-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{overallStatus}</h1>
          <p className="text-lg text-gray-600 mb-6">
            Real-time monitoring of LVRXchange platform services and infrastructure
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {currentTime}
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Current Status */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Current Status</h2>
          <div className="grid gap-4">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{service.uptime}</div>
                      <div className="text-gray-500">30-day uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{service.responseTime}ms</div>
                      <div className="text-gray-500">Avg response</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Performance Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Overall Uptime</h3>
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">99.96%</div>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Avg Response Time</h3>
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">234ms</div>
              <div className="text-sm text-gray-500">Global average</div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Incidents Resolved</h3>
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/24</div>
              <div className="text-sm text-gray-500">This quarter</div>
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Incident History</h2>
          {recentIncidents.length > 0 ? (
            <div className="space-y-6">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(incident.status)}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{incident.title}</h3>
                        <p className="text-gray-600 mb-2">{incident.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{new Date(incident.date).toLocaleDateString()}</span>
                          <span className={`px-2 py-1 rounded-full ${getStatusColor(incident.impact)}`}>
                            {incident.impact} impact
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Updates:</h4>
                    <div className="space-y-3">
                      {incident.updates.map((update, updateIndex) => (
                        <div key={updateIndex} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(update.status).includes('green') ? 'bg-green-400' : 
                            getStatusColor(update.status).includes('blue') ? 'bg-blue-400' :
                            getStatusColor(update.status).includes('orange') ? 'bg-orange-400' : 'bg-gray-400'}`}></div>
                          <div>
                            <p className="text-gray-700">{update.message}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(update.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recent Incidents</h3>
              <p className="text-gray-600">All systems have been operating smoothly.</p>
            </div>
          )}
        </section>

        {/* Subscribe to Updates */}
        <section className="text-center">
          <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to get notified about service updates and maintenance windows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              You can unsubscribe at any time. We'll only send important service updates.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}