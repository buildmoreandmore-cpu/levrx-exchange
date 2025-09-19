import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Allowed file types and max size
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()

    // Handle single file upload
    const file = formData.get('file') as File
    if (file) {
      const result = await uploadSingleFile(file, user.id)
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: result.status })
      }
      return NextResponse.json({ success: true, url: result.url })
    }

    // Handle multiple files upload
    const files = formData.getAll('files') as File[]
    if (files.length > 0) {
      const results = await uploadMultipleFiles(files, user.id)
      if (results.error) {
        return NextResponse.json({ error: results.error }, { status: results.status })
      }
      return NextResponse.json({ success: true, urls: results.urls })
    }

    return NextResponse.json(
      { error: 'No file uploaded' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

async function uploadSingleFile(file: File, userId: string) {
  // Validate file
  const validation = validateFile(file)
  if (!validation.valid) {
    return { error: validation.error, status: 400 }
  }

  try {
    // Generate unique filename
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const fileName = `${userId}/${timestamp}-${randomId}.${extension}`

    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer()

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('listing-photos')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return { error: 'Upload failed', status: 500 }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('listing-photos')
      .getPublicUrl(fileName)

    return { url: urlData.publicUrl }
  } catch (error) {
    console.error('File upload error:', error)
    return { error: 'Upload failed', status: 500 }
  }
}

async function uploadMultipleFiles(files: File[], userId: string) {
  // Validate all files first
  for (const file of files) {
    const validation = validateFile(file)
    if (!validation.valid) {
      return { error: validation.error, status: 400 }
    }
  }

  try {
    const uploadPromises = files.map(file => uploadSingleFile(file, userId))
    const results = await Promise.all(uploadPromises)

    // Check if any uploads failed
    const failedUploads = results.filter(result => result.error)
    if (failedUploads.length > 0) {
      return { error: 'Some uploads failed', status: 500 }
    }

    const urls = results.map(result => result.url!)
    return { urls }
  } catch (error) {
    console.error('Multiple upload error:', error)
    return { error: 'Upload failed', status: 500 }
  }
}

function validateFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`
    }
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    }
  }

  return { valid: true }
}