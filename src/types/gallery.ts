export interface Photo {
  id: string
  filename: string
  originalFilename: string
  url: string
  thumbnailUrl?: string
  polaroidUrl?: string
  caption?: string
  year: number
  positionX?: number
  positionY?: number
  rotationAngle?: number
  takenAt?: Date
  uploadedAt: Date
  metadata?: PhotoMetadata
  isFavorite?: boolean
  fileSize: number
  dimensions: {
    width: number
    height: number
  }
  polaroidSettings?: PolaroidSettings
}

export interface PhotoMetadata {
  camera?: string
  lens?: string
  iso?: number
  aperture?: string
  shutterSpeed?: string
  focalLength?: string
  location?: {
    latitude: number
    longitude: number
    address?: string
  }
  exif?: Record<string, any>
}

export interface PolaroidSettings {
  borderColor: string
  captionFont: string
  dateStamp: boolean
  rotation?: number
}

export interface Album {
  id: string
  title: string
  description?: string
  coverImage?: string
  year: number
  photos: Photo[]
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
  sortOrder: number
}

export interface GalleryState {
  photos: Photo[]
  albums: Album[]
  selectedYear: number
  selectedPhoto?: Photo
  isLoading: boolean
  error?: string
  viewerOpen: boolean
  uploadOpen: boolean
}

export interface YearData {
  year: number
  photoCount: number
  isActive?: boolean
  photos?: Photo[]
}

// Upload related types
export interface UploadProgress {
  photoId: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export interface PhotoFilters {
  year?: number
  isFavorite?: boolean
  hasCaption?: boolean
  sortBy?: 'uploadedAt' | 'takenAt' | 'filename'
  sortOrder?: 'asc' | 'desc'
}