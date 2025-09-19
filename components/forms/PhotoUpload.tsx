'use client'

import React, { useState, useRef, useCallback } from 'react'

interface PhotoUploadProps {
  photos: string[]
  onChange: (photos: string[]) => void
  maxPhotos?: number
  className?: string
}

interface UploadState {
  uploading: boolean
  progress: number
  error: string | null
}

export default function PhotoUpload({
  photos,
  onChange,
  maxPhotos = 10,
  className = ''
}: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef(0)

  const handleFileSelect = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files)

    // Check if adding these files would exceed the limit
    if (photos.length + fileArray.length > maxPhotos) {
      setUploadState(prev => ({
        ...prev,
        error: `Cannot upload ${fileArray.length} files. Maximum ${maxPhotos} photos allowed.`
      }))
      return
    }

    // Validate files
    const validFiles: File[] = []
    for (const file of fileArray) {
      const validation = validateFile(file)
      if (!validation.valid) {
        setUploadState(prev => ({
          ...prev,
          error: validation.error!
        }))
        return
      }
      validFiles.push(file)
    }

    if (validFiles.length === 0) return

    // Clear any previous errors
    setUploadState(prev => ({ ...prev, error: null }))

    // Upload files
    await uploadFiles(validFiles)
  }, [photos.length, maxPhotos])

  const uploadFiles = async (files: File[]) => {
    setUploadState({
      uploading: true,
      progress: 0,
      error: null
    })

    try {
      const formData = new FormData()

      if (files.length === 1) {
        formData.append('file', files[0])
      } else {
        files.forEach(file => {
          formData.append('files', file)
        })
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      // Handle single or multiple file response
      const newUrls = data.url ? [data.url] : data.urls
      const updatedPhotos = [...photos, ...newUrls]
      onChange(updatedPhotos)

      setUploadState({
        uploading: false,
        progress: 100,
        error: null
      })
    } catch (error) {
      console.error('Upload error:', error)
      setUploadState({
        uploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Upload failed'
      })
    }
  }

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type. Please upload: ${allowedTypes.join(', ')}`
      }
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`
      }
    }

    return { valid: true }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    dragCounterRef.current = 0

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    onChange(newPhotos)
  }

  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-gray-400'
          }
          ${uploadState.uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileSelector}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openFileSelector()
          }
        }}
        aria-label="Upload photos"
        aria-describedby="upload-description"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
          aria-label="Upload photos"
        />

        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div>
            <p className="text-lg font-medium text-gray-900">
              Drag & drop photos here
            </p>
            <p className="text-sm text-gray-600">
              or click to select files
            </p>
          </div>

          <p id="upload-description" className="text-xs text-gray-500">
            JPG, PNG, WebP up to 5MB • Maximum {maxPhotos} photos
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadState.uploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-700">Uploading photos...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {uploadState.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-red-700">{uploadState.error}</span>
          </div>
        </div>
      )}

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">
              Uploaded Photos ({photos.length}/{maxPhotos})
            </h4>
            {photos.length > 0 && (
              <button
                onClick={() => onChange([])}
                className="text-xs text-red-600 hover:text-red-700"
              >
                Remove All
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt="Photo preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemovePhoto(index)
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                  aria-label="Delete photo"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      {photos.length === 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Photos help attract more interest to your listing
          </p>
        </div>
      )}
    </div>
  )
}