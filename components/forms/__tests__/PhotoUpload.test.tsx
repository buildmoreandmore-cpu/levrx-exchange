/**
 * PhotoUpload Component Tests
 *
 * These tests validate the PhotoUpload component functionality
 * including drag & drop, file validation, preview, and upload handling.
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PhotoUpload from '../PhotoUpload'
import { validImageFiles, invalidFiles, mockImageUrls } from '../../../test/fixtures/images'

// Mock fetch for API calls
global.fetch = jest.fn()

// Mock URL.createObjectURL for preview functionality
global.URL.createObjectURL = jest.fn(() => 'mock-blob-url')
global.URL.revokeObjectURL = jest.fn()

describe('PhotoUpload Component', () => {
  const mockOnChange = jest.fn()
  const defaultProps = {
    photos: [],
    onChange: mockOnChange,
    maxPhotos: 10,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        url: 'https://test.supabase.co/storage/v1/object/public/listing-photos/test.jpg',
      }),
    })
  })

  describe('Rendering', () => {
    it('should render upload area', () => {
      render(<PhotoUpload {...defaultProps} />)

      expect(screen.getByText(/drag & drop photos/i)).toBeInTheDocument()
      expect(screen.getByText(/or click to select/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /upload photos/i })).toBeInTheDocument()
    })

    it('should show photo count limit', () => {
      render(<PhotoUpload {...defaultProps} maxPhotos={5} />)

      expect(screen.getByText(/maximum 5 photos/i)).toBeInTheDocument()
    })

    it('should display existing photos', () => {
      render(
        <PhotoUpload
          {...defaultProps}
          photos={mockImageUrls.slice(0, 2)}
        />
      )

      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(2)

      // Check that URLs are set correctly
      expect(images[0]).toHaveAttribute('src', mockImageUrls[0])
      expect(images[1]).toHaveAttribute('src', mockImageUrls[1])
    })
  })

  describe('File Selection', () => {
    it('should accept file input click', async () => {
      const user = userEvent.setup()
      render(<PhotoUpload {...defaultProps} />)

      const input = screen.getByRole('button', { name: /upload photos/i })
      await user.click(input)

      // File input should be present (hidden)
      const fileInput = document.querySelector('input[type="file"]')
      expect(fileInput).toBeInTheDocument()
    })

    it('should accept multiple files', () => {
      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      expect(fileInput).toHaveAttribute('multiple')
      expect(fileInput).toHaveAttribute('accept', 'image/jpeg,image/jpg,image/png,image/webp')
    })

    it('should handle file selection', async () => {
      const user = userEvent.setup()
      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      await user.upload(fileInput, [validImageFiles.jpeg, validImageFiles.png])

      // Should show upload progress or preview
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled()
      })
    })
  })

  describe('Drag and Drop', () => {
    it('should handle drag enter event', () => {
      render(<PhotoUpload {...defaultProps} />)

      const dropZone = screen.getByRole('button', { name: /upload photos/i }).parentElement
      expect(dropZone).toBeInTheDocument()

      fireEvent.dragEnter(dropZone!, {
        dataTransfer: {
          items: [{ kind: 'file', type: 'image/jpeg' }],
        },
      })

      // Should show visual feedback for drag state
      expect(dropZone).toHaveClass('border-indigo-500')
    })

    it('should handle drag over event', () => {
      render(<PhotoUpload {...defaultProps} />)

      const dropZone = screen.getByRole('button', { name: /upload photos/i }).parentElement

      fireEvent.dragOver(dropZone!, {
        dataTransfer: {
          items: [{ kind: 'file', type: 'image/jpeg' }],
        },
      })

      // Should prevent default behavior
      expect(dropZone).toHaveClass('border-indigo-500')
    })

    it('should handle file drop', async () => {
      render(<PhotoUpload {...defaultProps} />)

      const dropZone = screen.getByRole('button', { name: /upload photos/i }).parentElement

      fireEvent.drop(dropZone!, {
        dataTransfer: {
          files: [validImageFiles.jpeg, validImageFiles.png],
        },
      })

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled()
      })
    })

    it('should reset drag state on drag leave', () => {
      render(<PhotoUpload {...defaultProps} />)

      const dropZone = screen.getByRole('button', { name: /upload photos/i }).parentElement

      // Enter drag state
      fireEvent.dragEnter(dropZone!)

      // Leave drag state
      fireEvent.dragLeave(dropZone!)

      expect(dropZone).not.toHaveClass('border-indigo-500')
    })
  })

  describe('File Validation', () => {
    it('should display error for invalid file types', async () => {
      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      fireEvent.change(fileInput, {
        target: { files: [invalidFiles.pdf] },
      })

      await waitFor(() => {
        expect(screen.getByText(/invalid file type/i)).toBeInTheDocument()
      })
    })

    it('should display error for oversized files', async () => {
      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      fireEvent.change(fileInput, {
        target: { files: [invalidFiles.oversized] },
      })

      await waitFor(() => {
        expect(screen.getByText(/file too large/i)).toBeInTheDocument()
      })
    })

    it('should enforce maximum photo limit', async () => {
      render(
        <PhotoUpload
          {...defaultProps}
          photos={Array(9).fill(mockImageUrls[0])}
          maxPhotos={10}
        />
      )

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      // Try to add 2 more photos (should exceed limit)
      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.jpeg, validImageFiles.png] },
      })

      await waitFor(() => {
        expect(screen.getByText(/maximum.*photos/i)).toBeInTheDocument()
      })
    })

    it('should validate each file in multi-select', async () => {
      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.jpeg, invalidFiles.pdf, validImageFiles.png] },
      })

      await waitFor(() => {
        expect(screen.getByText(/invalid file type/i)).toBeInTheDocument()
      })
    })
  })

  describe('Upload Progress', () => {
    it('should show upload progress during upload', async () => {
      // Mock slow upload
      ;(fetch as jest.Mock).mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: () => Promise.resolve({ success: true, url: 'test-url' }),
                }),
              100
            )
          )
      )

      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.jpeg] },
      })

      // Should show progress indicator
      await waitFor(() => {
        expect(screen.getByText(/uploading/i)).toBeInTheDocument()
      })
    })

    it('should hide progress after successful upload', async () => {
      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.jpeg] },
      })

      await waitFor(() => {
        expect(screen.queryByText(/uploading/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Photo Preview and Management', () => {
    it('should show preview of uploaded photos', async () => {
      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.jpeg] },
      })

      await waitFor(() => {
        const preview = screen.getByRole('img')
        expect(preview).toBeInTheDocument()
      })
    })

    it('should allow deletion of uploaded photos', async () => {
      render(
        <PhotoUpload
          {...defaultProps}
          photos={[mockImageUrls[0]]}
        />
      )

      const deleteButton = screen.getByRole('button', { name: /delete photo/i })
      expect(deleteButton).toBeInTheDocument()

      fireEvent.click(deleteButton)

      expect(mockOnChange).toHaveBeenCalledWith([])
    })

    it('should show delete button on hover', () => {
      render(
        <PhotoUpload
          {...defaultProps}
          photos={[mockImageUrls[0]]}
        />
      )

      const photoContainer = screen.getByRole('img').parentElement

      fireEvent.mouseEnter(photoContainer!)

      const deleteButton = screen.getByRole('button', { name: /delete photo/i })
      expect(deleteButton).toBeVisible()
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.jpeg] },
      })

      await waitFor(() => {
        expect(screen.getByText(/upload failed/i)).toBeInTheDocument()
      })
    })

    it('should handle API errors gracefully', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Upload failed' }),
      })

      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.jpeg] },
      })

      await waitFor(() => {
        expect(screen.getByText(/upload failed/i)).toBeInTheDocument()
      })
    })

    it('should clear error messages after successful retry', async () => {
      // First upload fails
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'Upload failed' }),
      })

      // Second upload succeeds
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, url: 'test-url' }),
      })

      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

      // First upload
      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.jpeg] },
      })

      await waitFor(() => {
        expect(screen.getByText(/upload failed/i)).toBeInTheDocument()
      })

      // Retry upload
      fireEvent.change(fileInput, {
        target: { files: [validImageFiles.png] },
      })

      await waitFor(() => {
        expect(screen.queryByText(/upload failed/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<PhotoUpload {...defaultProps} />)

      const uploadButton = screen.getByRole('button', { name: /upload photos/i })

      // Should be focusable
      await user.tab()
      expect(uploadButton).toHaveFocus()

      // Should activate with Enter key
      await user.keyboard('{Enter}')

      const fileInput = document.querySelector('input[type="file"]')
      expect(fileInput).toBeInTheDocument()
    })

    it('should have proper aria labels', () => {
      render(<PhotoUpload {...defaultProps} />)

      const fileInput = document.querySelector('input[type="file"]')
      expect(fileInput).toHaveAttribute('aria-label', 'Upload photos')

      const uploadArea = screen.getByRole('button', { name: /upload photos/i })
      expect(uploadArea).toHaveAttribute('aria-describedby')
    })

    it('should provide alt text for preview images', () => {
      render(
        <PhotoUpload
          {...defaultProps}
          photos={[mockImageUrls[0]]}
        />
      )

      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', 'Photo preview')
    })
  })

  describe('Mobile Support', () => {
    it('should work on touch devices', () => {
      // Mock touch device
      Object.defineProperty(navigator, 'maxTouchPoints', {
        writable: true,
        value: 1,
      })

      render(<PhotoUpload {...defaultProps} />)

      const uploadButton = screen.getByRole('button', { name: /upload photos/i })
      expect(uploadButton).toBeInTheDocument()

      // Should handle touch events
      fireEvent.touchStart(uploadButton)
      fireEvent.touchEnd(uploadButton)

      const fileInput = document.querySelector('input[type="file"]')
      expect(fileInput).toBeInTheDocument()
    })

    it('should have appropriate touch targets', () => {
      render(
        <PhotoUpload
          {...defaultProps}
          photos={[mockImageUrls[0]]}
        />
      )

      const deleteButton = screen.getByRole('button', { name: /delete photo/i })

      // Should have minimum touch target size (44px)
      const styles = window.getComputedStyle(deleteButton)
      expect(parseInt(styles.minWidth) >= 44 || parseInt(styles.width) >= 44).toBe(true)
      expect(parseInt(styles.minHeight) >= 44 || parseInt(styles.height) >= 44).toBe(true)
    })
  })
})