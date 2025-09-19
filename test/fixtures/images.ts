// Mock File objects for testing
export const createMockFile = (
  name: string,
  size: number,
  type: string,
  content = 'mock file content'
): File => {
  const blob = new Blob([content], { type })
  return new File([blob], name, { type })
}

export const validImageFiles = {
  jpeg: createMockFile('test.jpg', 1024 * 1024, 'image/jpeg'), // 1MB
  png: createMockFile('test.png', 2 * 1024 * 1024, 'image/png'), // 2MB
  webp: createMockFile('test.webp', 500 * 1024, 'image/webp'), // 500KB
  smallImage: createMockFile('small.jpg', 100 * 1024, 'image/jpeg'), // 100KB
}

export const invalidFiles = {
  pdf: createMockFile('document.pdf', 1024 * 1024, 'application/pdf'),
  txt: createMockFile('text.txt', 1024, 'text/plain'),
  exe: createMockFile('virus.exe', 1024 * 1024, 'application/x-msdownload'),
  oversized: createMockFile('huge.jpg', 10 * 1024 * 1024, 'image/jpeg'), // 10MB
}

export const mockImageUrls = [
  'https://test.supabase.co/storage/v1/object/public/listing-photos/photo1.jpg',
  'https://test.supabase.co/storage/v1/object/public/listing-photos/photo2.png',
  'https://test.supabase.co/storage/v1/object/public/listing-photos/photo3.webp',
]

export const brokenImageUrls = [
  'https://broken.example.com/image.jpg',
  'not-a-url',
  '',
]