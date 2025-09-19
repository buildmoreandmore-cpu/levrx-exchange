/**
 * New Listing Form Integration Tests for Photos
 *
 * These tests validate that the photo upload component integrates properly
 * with the new listing form.
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewListingContent from '../page'
import { validImageFiles, mockImageUrls } from '../../../../test/fixtures/images'

// Mock PhotoUpload component
jest.mock('../../../../components/forms/PhotoUpload', () => {
  return function MockPhotoUpload({ photos, onChange, maxPhotos }: any) {
    return (
      <div data-testid="photo-upload">
        <div>Photos: {photos.length}/{maxPhotos}</div>
        <button
          onClick={() => onChange([...photos, mockImageUrls[0]])}
          data-testid="add-photo"
        >
          Add Photo
        </button>
        <button
          onClick={() => onChange([])}
          data-testid="clear-photos"
        >
          Clear Photos
        </button>
        {photos.map((url: string, index: number) => (
          <div key={index} data-testid={`photo-${index}`}>
            {url}
          </div>
        ))}
      </div>
    )
  }
})

// Mock fetch for form submission
global.fetch = jest.fn()

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}))

describe('New Listing Form - Photo Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
  })

  describe('Photo Upload Component Presence', () => {
    it('should display photo upload component', () => {
      render(<NewListingContent />)

      const photoUpload = screen.getByTestId('photo-upload')
      expect(photoUpload).toBeInTheDocument()
    })

    it('should show photo count and limit', () => {
      render(<NewListingContent />)

      expect(screen.getByText('Photos: 0/10')).toBeInTheDocument()
    })
  })

  describe('Photo Management in Form', () => {
    it('should allow adding photos to form', async () => {
      const user = userEvent.setup()
      render(<NewListingContent />)

      const addPhotoButton = screen.getByTestId('add-photo')
      await user.click(addPhotoButton)

      expect(screen.getByText('Photos: 1/10')).toBeInTheDocument()
      expect(screen.getByTestId('photo-0')).toBeInTheDocument()
    })

    it('should allow clearing photos from form', async () => {
      const user = userEvent.setup()
      render(<NewListingContent />)

      // Add a photo first
      const addPhotoButton = screen.getByTestId('add-photo')
      await user.click(addPhotoButton)

      expect(screen.getByText('Photos: 1/10')).toBeInTheDocument()

      // Clear photos
      const clearButton = screen.getByTestId('clear-photos')
      await user.click(clearButton)

      expect(screen.getByText('Photos: 0/10')).toBeInTheDocument()
      expect(screen.queryByTestId('photo-0')).not.toBeInTheDocument()
    })

    it('should preserve photos when switching between form sections', async () => {
      const user = userEvent.setup()
      render(<NewListingContent />)

      // Add a photo
      const addPhotoButton = screen.getByTestId('add-photo')
      await user.click(addPhotoButton)

      expect(screen.getByText('Photos: 1/10')).toBeInTheDocument()

      // Switch category (which might trigger form re-render)
      const categorySelect = screen.getByLabelText(/category/i)
      await user.selectOptions(categorySelect, 'Cash')

      // Photos should still be there
      expect(screen.getByText('Photos: 1/10')).toBeInTheDocument()
      expect(screen.getByTestId('photo-0')).toBeInTheDocument()
    })
  })

  describe('Form Submission with Photos', () => {
    it('should include photos in form submission', async () => {
      const user = userEvent.setup()
      render(<NewListingContent />)

      // Fill required fields
      await user.type(screen.getByLabelText(/title/i), 'Test Property')
      await user.type(screen.getByLabelText(/description/i), 'Test description')

      // Add photos
      const addPhotoButton = screen.getByTestId('add-photo')
      await user.click(addPhotoButton)
      await user.click(addPhotoButton)

      expect(screen.getByText('Photos: 2/10')).toBeInTheDocument()

      // Submit form
      const submitButton = screen.getByRole('button', { name: /create listing/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/listings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining(mockImageUrls[0]),
        })
      })
    })

    it('should handle form submission without photos', async () => {
      const user = userEvent.setup()
      render(<NewListingContent />)

      // Fill required fields
      await user.type(screen.getByLabelText(/title/i), 'Test Property')
      await user.type(screen.getByLabelText(/description/i), 'Test description')

      // Don't add photos

      // Submit form
      const submitButton = screen.getByRole('button', { name: /create listing/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/listings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"photos":[]'),
        })
      })
    })

    it('should preserve photos on form validation errors', async () => {
      const user = userEvent.setup()
      render(<NewListingContent />)

      // Add photos
      const addPhotoButton = screen.getByTestId('add-photo')
      await user.click(addPhotoButton)

      expect(screen.getByText('Photos: 1/10')).toBeInTheDocument()

      // Try to submit without required fields (should trigger validation)
      const submitButton = screen.getByRole('button', { name: /create listing/i })
      await user.click(submitButton)

      // Photos should still be there after validation error
      expect(screen.getByText('Photos: 1/10')).toBeInTheDocument()
      expect(screen.getByTestId('photo-0')).toBeInTheDocument()
    })
  })

  describe('Draft Functionality with Photos', () => {
    it('should save photos to draft storage', async () => {
      const user = userEvent.setup()

      // Mock localStorage
      const mockSetItem = jest.fn()
      const mockGetItem = jest.fn().mockReturnValue(null)
      Object.defineProperty(window, 'localStorage', {
        value: {
          setItem: mockSetItem,
          getItem: mockGetItem,
        },
      })

      render(<NewListingContent />)

      // Add photos
      const addPhotoButton = screen.getByTestId('add-photo')
      await user.click(addPhotoButton)

      // Type something to trigger draft save
      await user.type(screen.getByLabelText(/title/i), 'Test')

      // Should save draft with photos
      await waitFor(() => {
        expect(mockSetItem).toHaveBeenCalledWith(
          expect.stringMatching(/levrx:new-listing:draft/),
          expect.stringContaining(mockImageUrls[0])
        )
      })
    })

    it('should restore photos from draft storage', () => {
      const draftData = JSON.stringify({
        kind: 'HAVE',
        category: 'Property',
        title: 'Draft Property',
        description: 'Draft description',
        photos: [mockImageUrls[0], mockImageUrls[1]],
      })

      // Mock localStorage with draft data
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(draftData),
          setItem: jest.fn(),
        },
      })

      render(<NewListingContent />)

      // Should restore photos from draft
      expect(screen.getByText('Photos: 2/10')).toBeInTheDocument()
      expect(screen.getByTestId('photo-0')).toBeInTheDocument()
      expect(screen.getByTestId('photo-1')).toBeInTheDocument()
    })
  })

  describe('Photo Requirements by Category', () => {
    it('should not require photos for Cash listings', async () => {
      const user = userEvent.setup()
      render(<NewListingContent />)

      // Select Cash category
      const categorySelect = screen.getByLabelText(/category/i)
      await user.selectOptions(categorySelect, 'Cash')

      // Fill required fields
      await user.type(screen.getByLabelText(/title/i), 'Cash Investment')
      await user.type(screen.getByLabelText(/description/i), 'Investment opportunity')

      // Submit without photos
      const submitButton = screen.getByRole('button', { name: /create listing/i })
      await user.click(submitButton)

      // Should succeed without photos
      await waitFor(() => {
        expect(fetch).toHaveBeenCalled()
      })
    })

    it('should encourage photos for Property listings', async () => {
      const user = userEvent.setup()
      render(<NewListingContent />)

      // Select Property category (default)
      await user.type(screen.getByLabelText(/title/i), 'Real Estate Property')
      await user.type(screen.getByLabelText(/description/i), 'Beautiful property')

      // Should show encouragement message for photos
      expect(screen.getByText(/photos help attract/i)).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('should handle upload errors without losing form data', async () => {
      const user = userEvent.setup()

      // Mock PhotoUpload to simulate upload error
      jest.doMock('../../../../components/forms/PhotoUpload', () => {
        return function MockPhotoUploadWithError({ photos, onChange }: any) {
          return (
            <div data-testid="photo-upload">
              <div>Photos: {photos.length}/10</div>
              <button
                onClick={() => {
                  // Simulate upload error
                  const errorEvent = new CustomEvent('uploadError', {
                    detail: { message: 'Upload failed' },
                  })
                  window.dispatchEvent(errorEvent)
                }}
                data-testid="trigger-error"
              >
                Trigger Error
              </button>
            </div>
          )
        }
      })

      render(<NewListingContent />)

      // Fill form data
      await user.type(screen.getByLabelText(/title/i), 'Test Property')
      await user.type(screen.getByLabelText(/description/i), 'Test description')

      // Trigger upload error
      const errorButton = screen.getByTestId('trigger-error')
      await user.click(errorButton)

      // Form data should still be there
      expect(screen.getByDisplayValue('Test Property')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Test description')).toBeInTheDocument()
    })

    it('should handle network errors during form submission with photos', async () => {
      const user = userEvent.setup()

      // Mock network error
      ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      render(<NewListingContent />)

      // Fill form and add photos
      await user.type(screen.getByLabelText(/title/i), 'Test Property')
      await user.type(screen.getByLabelText(/description/i), 'Test description')

      const addPhotoButton = screen.getByTestId('add-photo')
      await user.click(addPhotoButton)

      // Submit form
      const submitButton = screen.getByRole('button', { name: /create listing/i })
      await user.click(submitButton)

      // Should show error but preserve photos
      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument()
        expect(screen.getByText('Photos: 1/10')).toBeInTheDocument()
      })
    })
  })
})