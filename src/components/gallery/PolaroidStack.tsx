'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PolaroidCard } from './PolaroidCard'
import { getRandomPosition } from '@/lib/utils'
import type { Photo } from '@/types/gallery'

interface PolaroidStackProps {
  photos: Photo[]
  containerWidth?: number
  containerHeight?: number
  onPhotoEdit?: (photo: Photo) => void
  onPhotoDelete?: (photo: Photo) => void
  onPhotoView?: (photo: Photo) => void
  onToggleFavorite?: (photo: Photo) => void
  className?: string
}

interface PhotoPosition {
  id: string
  x: number
  y: number
  zIndex: number
}

export const PolaroidStack: React.FC<PolaroidStackProps> = ({
  photos,
  containerWidth = 1200,
  containerHeight = 800,
  onPhotoEdit,
  onPhotoDelete,
  onPhotoView,
  onToggleFavorite,
  className,
}) => {
  const [positions, setPositions] = useState<PhotoPosition[]>([])
  const [draggedPhoto, setDraggedPhoto] = useState<string | null>(null)

  // Generate initial positions
  useEffect(() => {
    const polaroidWidth = 192 + 24 // 48 width + padding
    const polaroidHeight = 240 + 24 // height + padding

    const newPositions = photos.map((photo, index) => {
      // Use saved position or generate random
      const savedX = photo.positionX
      const savedY = photo.positionY

      const position = savedX !== undefined && savedY !== undefined
        ? { x: savedX, y: savedY }
        : getRandomPosition(
            containerWidth - polaroidWidth,
            containerHeight - polaroidHeight,
            polaroidWidth,
            polaroidHeight
          )

      return {
        id: photo.id,
        x: Math.max(0, Math.min(position.x, containerWidth - polaroidWidth)),
        y: Math.max(0, Math.min(position.y, containerHeight - polaroidHeight)),
        zIndex: photos.length - index, // Stack newer photos on top
      }
    })

    setPositions(newPositions)
  }, [photos, containerWidth, containerHeight])

  const handleDragEnd = (photoId: string, x: number, y: number) => {
    setPositions(prev => 
      prev.map(pos => 
        pos.id === photoId 
          ? { ...pos, x: Math.max(0, x), y: Math.max(0, y), zIndex: Math.max(...prev.map(p => p.zIndex)) + 1 }
          : pos
      )
    )
    setDraggedPhoto(null)
    
    // Here you could save positions to storage/database
    // savePhotoPosition(photoId, x, y)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      className={`relative bg-surface-50 dark:bg-surface-900 rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 overflow-hidden ${className}`}
      style={{ width: containerWidth, height: containerHeight, minHeight: '400px' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="60" height="60" className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="polaroid-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#polaroid-pattern)" />
        </svg>
      </div>

      {/* Empty State */}
      {photos.length === 0 && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 bg-surface-200 dark:bg-surface-700 rounded-2xl flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-surface-300 dark:bg-surface-600 rounded-lg transform rotate-12"></div>
          </div>
          <h3 className="text-headline-medium text-surface-600 dark:text-surface-400 mb-2">
            No photos yet
          </h3>
          <p className="text-body-medium text-surface-500 dark:text-surface-500 max-w-sm">
            Upload your first photos to start creating your polaroid memory collection
          </p>
        </motion.div>
      )}

      {/* Polaroid Photos */}
      <AnimatePresence>
        {photos.map((photo) => {
          const position = positions.find(p => p.id === photo.id)
          if (!position) return null

          return (
            <PolaroidCard
              key={photo.id}
              photo={photo}
              onEdit={onPhotoEdit}
              onDelete={onPhotoDelete}
              onView={onPhotoView}
              onToggleFavorite={onToggleFavorite}
              isDragging={draggedPhoto === photo.id}
              style={{
                left: position.x,
                top: position.y,
                zIndex: position.zIndex,
              }}
            />
          )
        })}
      </AnimatePresence>

      {/* Photo Count Indicator */}
      {photos.length > 0 && (
        <motion.div
          className="absolute top-4 right-4 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-700"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          {photos.length} photo{photos.length !== 1 ? 's' : ''}
        </motion.div>
      )}
    </motion.div>
  )
}