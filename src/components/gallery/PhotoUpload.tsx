'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, AlertCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { generateId, formatFileSize } from '@/lib/utils'
import type { Photo } from '@/types/gallery'

interface UploadFile {
  id: string
  file: File
  preview: string
  caption: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress: number
  error?: string
}

interface PhotoUploadProps {
  year: number
  onUpload?: (photos: Partial<Photo>[]) => void
  onClose?: () => void
  maxFiles?: number
  maxFileSize?: number // in bytes
  acceptedTypes?: string[]
  className?: string
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  year,
  onUpload,
  onClose,
  maxFiles = 20,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className,
}) => {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return 'File type not supported. Please use JPEG, PNG, or WebP.'
    }
    if (file.size > maxFileSize) {
      return `File too large. Maximum size is ${formatFileSize(maxFileSize)}.`
    }
    return null
  }

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadFile[] = []
    
    Array.from(fileList).forEach((file) => {
      if (files.length + newFiles.length >= maxFiles) return
      
      const validation = validateFile(file)
      const id = generateId()
      
      const uploadFile: UploadFile = {
        id,
        file,
        preview: URL.createObjectURL(file),
        caption: '',
        status: validation ? 'error' : 'pending',
        progress: 0,
        error: validation || undefined,
      }
      
      newFiles.push(uploadFile)
    })
    
    setFiles(prev => [...prev, ...newFiles])
  }, [files.length, maxFiles, maxFileSize, acceptedTypes])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    // Only set to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }, [])

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const updateCaption = (id: string, caption: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, caption } : f
    ))
  }

  const simulateUpload = async (file: UploadFile): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress: Math.min(progress, 95) } : f
        ))
        
        if (progress >= 95) {
          clearInterval(interval)
          // Simulate success/error
          const success = Math.random() > 0.1 // 90% success rate
          
          setTimeout(() => {
            setFiles(prev => prev.map(f => 
              f.id === file.id 
                ? { 
                    ...f, 
                    status: success ? 'success' : 'error',
                    progress: success ? 100 : 0,
                    error: success ? undefined : 'Upload failed. Please try again.'
                  } 
                : f
            ))
            
            if (success) resolve()
            else reject(new Error('Upload failed'))
          }, 500)
        }
      }, 200)
    })
  }

  const handleUpload = async () => {
    const validFiles = files.filter(f => f.status === 'pending')
    if (validFiles.length === 0) return

    setIsUploading(true)

    // Update status to uploading
    setFiles(prev => prev.map(f => 
      f.status === 'pending' ? { ...f, status: 'uploading' as const } : f
    ))

    try {
      // Upload all files concurrently
      await Promise.allSettled(
        validFiles.map(file => simulateUpload(file))
      )

      // Create photo objects for successful uploads
      const successfulFiles = files.filter(f => f.status === 'success')
      const photos: Partial<Photo>[] = successfulFiles.map(f => ({
        id: f.id,
        filename: f.file.name,
        originalFilename: f.file.name,
        url: f.preview, // In real app, this would be the uploaded URL
        caption: f.caption || undefined,
        year,
        uploadedAt: new Date(),
        fileSize: f.file.size,
        dimensions: { width: 0, height: 0 }, // Would be detected during upload
        rotationAngle: Math.random() * 30 - 15,
      }))

      if (onUpload && photos.length > 0) {
        onUpload(photos)
      }

    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const hasValidFiles = files.some(f => f.status === 'pending')
  const hasSuccessfulUploads = files.some(f => f.status === 'success')

  return (
    <motion.div
      className={`bg-card border border-border rounded-2xl p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-headline-large font-semibold">Upload Photos</h2>
          <p className="text-body-medium text-muted-foreground">
            Add photos to your {year} collection
          </p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
            aria-label="Close upload"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Drop Zone */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
            : 'border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <div className="space-y-4">
          <motion.div
            className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center ${
              isDragging
                ? 'bg-primary-100 dark:bg-primary-900'
                : 'bg-surface-100 dark:bg-surface-800'
            }`}
            animate={{ 
              scale: isDragging ? 1.1 : 1,
              rotate: isDragging ? 5 : 0 
            }}
          >
            <Upload className={`w-8 h-8 ${
              isDragging ? 'text-primary-600' : 'text-surface-500'
            }`} />
          </motion.div>

          <div>
            <p className="text-headline-small font-medium mb-1">
              {isDragging ? 'Drop photos here' : 'Drag & drop photos here'}
            </p>
            <p className="text-body-small text-muted-foreground">
              or click to browse • Max {maxFiles} files • {formatFileSize(maxFileSize)} each
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {acceptedTypes.map((type) => (
              <span
                key={type}
                className="px-2 py-1 bg-surface-100 dark:bg-surface-800 text-xs rounded"
              >
                {type.split('/')[1].toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-xl"
                >
                  {/* Preview */}
                  <div className="relative w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                    {file.status === 'success' && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-500" />
                      </div>
                    )}
                    {file.status === 'error' && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-body-medium font-medium truncate">
                        {file.file.name}
                      </p>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-surface-200 dark:hover:bg-surface-600 rounded transition-colors"
                        disabled={file.status === 'uploading'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-body-small text-muted-foreground mb-2">
                      {formatFileSize(file.file.size)}
                    </p>

                    {/* Caption Input */}
                    {file.status !== 'error' && (
                      <input
                        type="text"
                        placeholder="Add a caption..."
                        value={file.caption}
                        onChange={(e) => updateCaption(file.id, e.target.value)}
                        className="w-full p-2 text-sm bg-surface-100 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        disabled={file.status === 'uploading'}
                      />
                    )}

                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                          <motion.div
                            className="bg-primary-500 h-2 rounded-full"
                            style={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploading... {Math.round(file.progress)}%
                        </p>
                      </div>
                    )}

                    {/* Error Message */}
                    {file.error && (
                      <p className="text-body-small text-red-500 mt-2">
                        {file.error}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mt-6 pt-4 border-t border-border"
        >
          <div className="text-body-small text-muted-foreground">
            {files.filter(f => f.status === 'success').length} of {files.length} uploaded
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setFiles([])}
              disabled={isUploading}
            >
              Clear All
            </Button>
            
            {hasValidFiles && (
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                loading={isUploading}
              >
                Upload {files.filter(f => f.status === 'pending').length} Photos
              </Button>
            )}

            {hasSuccessfulUploads && !hasValidFiles && (
              <Button onClick={onClose}>
                Done
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}