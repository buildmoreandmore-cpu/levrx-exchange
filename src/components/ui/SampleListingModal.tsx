'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'

interface SampleListingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SampleListingModal({ isOpen, onClose }: SampleListingModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                {/* Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Title */}
                <Dialog.Title as="h3" className="text-xl font-bold text-gray-900 text-center mb-4">
                  This is a Sample Listing
                </Dialog.Title>

                {/* Description */}
                <div className="text-gray-600 text-center space-y-3 mb-8">
                  <p>
                    You're viewing a demonstration of how listings appear on LVRXchange. This is sample data designed to showcase our platform's capabilities.
                  </p>
                  <p className="font-medium">
                    To view real listings and connect with actual investment opportunities, please sign in or create an account.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="/sign-up"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
                    onClick={onClose}
                  >
                    Create Free Account
                  </Link>
                  <Link
                    href="/sign-in"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors text-center"
                    onClick={onClose}
                  >
                    Sign In
                  </Link>
                  <button
                    onClick={onClose}
                    className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
                  >
                    Continue Browsing Demo
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account Benefits:</p>
                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                        <li>• Access to real property listings and opportunities</li>
                        <li>• AI-powered investment matching</li>
                        <li>• Direct communication with property owners</li>
                        <li>• Create and manage your own listings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}