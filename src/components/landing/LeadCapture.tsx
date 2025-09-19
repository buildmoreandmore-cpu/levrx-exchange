'use client'

import { useState, useEffect, useRef } from 'react'

const DISMISSAL_KEY = 'levrx-lead-capture-dismissed'
const DISMISSAL_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
const IDLE_TIMEOUT = 25000 // 25 seconds

export default function LeadCapture() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [lastActivity, setLastActivity] = useState(Date.now())
  
  const modalRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Track user activity
  const updateActivity = () => {
    setLastActivity(Date.now())
  }

  // Check if modal should be shown
  const shouldShowModal = () => {
    const dismissed = localStorage.getItem(DISMISSAL_KEY)
    if (!dismissed) return true
    
    const dismissalTime = parseInt(dismissed, 10)
    return Date.now() - dismissalTime > DISMISSAL_DURATION
  }

  // Handle exit intent
  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0 && shouldShowModal() && !isVisible) {
      setIsVisible(true)
    }
  }

  // Handle idle timeout
  const checkIdleTimeout = () => {
    if (Date.now() - lastActivity >= IDLE_TIMEOUT && shouldShowModal() && !isVisible) {
      setIsVisible(true)
    }
  }

  useEffect(() => {
    if (!shouldShowModal()) return

    // Add exit intent listener
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add activity listeners
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity)
    })

    // Set idle timeout check
    const interval = setInterval(checkIdleTimeout, 1000)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
      clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [lastActivity, isVisible])

  // Focus management
  useEffect(() => {
    if (isVisible && modalRef.current) {
      const firstInput = modalRef.current.querySelector('input')
      firstInput?.focus()
    }
  }, [isVisible])

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(handleClose, 3000) // Auto-close after 3 seconds
      } else {
        throw new Error('Failed to submit')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    localStorage.setItem(DISMISSAL_KEY, Date.now().toString())
    setIsVisible(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isVisible) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-0"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button */}
        <div className="absolute right-0 top-0 pr-4 pt-4">
          <button
            type="button"
            className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
            {!isSubmitted ? (
              <>
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                  Get early access updates
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Be the first to know about new features, market insights, and platform updates.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {error && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Notify me'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Not now
                    </button>
                  </div>
                </form>

                <p className="mt-3 text-xs text-gray-500">
                  We'll only email you about LVRXchange. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Thanks for signing up!
                </h3>
                <p className="text-sm text-gray-500">
                  We'll keep you updated on LVRXchange developments.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}