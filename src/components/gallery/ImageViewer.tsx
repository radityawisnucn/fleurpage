'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Heart,
  Share2,
  Edit3,
  RotateCw,
  Maximize
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import IconButton from '@/components/ui/IconButton'
import type { Photo } from '@/types/gallery'

interface ImageViewerProps {
  photos: Photo[]
  currentPhotoId: string
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
  onToggleFavorite?: (photo: Photo) => void
  onEdit?: (photo: Photo) => void
  onDownload?: (photo: Photo) => void
  onShare?: (photo: Photo) => void
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  photos,
  currentPhotoId,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  onToggleFavorite,
  onEdit,
  onDownload,
  onShare,
}) => {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const currentPhoto = photos.find(p => p.id === currentPhotoId)
  const currentIndex = photos.findIndex(p => p.id === currentPhotoId)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrevious?.()
          break
        case 'ArrowRight':
          onNext?.()
          break
        case '+':
        case '=':
          setZoom(prev => Math.min(prev * 1.2, 5))
          break
        case '-':
          setZoom(prev => Math.max(prev / 1.2, 0.5))
          break
        case '0':
          setZoom(1)
          setPosition({ x: 0, y: 0 })
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrevious])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Reset zoom and position when photo changes
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [currentPhotoId])

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 5))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5))
  const handleResetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition(prev => ({
        x: prev.x + e.movementX / zoom,
        y: prev.y + e.movementY / zoom,
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (!isOpen || !currentPhoto) return null

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as const, duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Content */}
        <motion.div
          className="relative w-full h-full flex flex-col"
          variants={contentVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <IconButton
                      icon={<X className="w-5 h-5" />}
                      onClick={onClose}
                      variant="ghost"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      aria-label="Close viewer"
                    />
                    <div className="text-white">
                      <h2 className="text-lg font-semibold">
                        {currentPhoto.caption || `Photo ${currentIndex + 1}`}
                      </h2>
                      <p className="text-sm opacity-80">
                        {currentIndex + 1} of {photos.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={<Heart className={`w-5 h-5 ${currentPhoto.isFavorite ? 'fill-current text-red-500' : ''}`} />}
                      onClick={() => onToggleFavorite?.(currentPhoto)}
                      variant="ghost"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      aria-label="Toggle favorite"
                    />
                    <IconButton
                      icon={<Edit3 className="w-5 h-5" />}
                      onClick={() => onEdit?.(currentPhoto)}
                      variant="ghost"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      aria-label="Edit photo"
                    />
                    <IconButton
                      icon={<Share2 className="w-5 h-5" />}
                      onClick={() => onShare?.(currentPhoto)}
                      variant="ghost"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      aria-label="Share photo"
                    />
                    <IconButton
                      icon={<Download className="w-5 h-5" />}
                      onClick={() => onDownload?.(currentPhoto)}
                      variant="ghost"
                      className="bg-black/20 hover:bg-black/40 text-white"
                      aria-label="Download photo"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Container */}
          <div
            className="flex-1 flex items-center justify-center p-4 cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={() => setShowControls(!showControls)}
          >
            <motion.div
              className="relative"
              style={{
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="polaroid-frame relative">
                <div className="w-96 h-96 bg-surface-100 dark:bg-surface-200 rounded overflow-hidden">
                  <Image
                    src={currentPhoto.url}
                    alt={currentPhoto.caption || `Photo from ${currentPhoto.year}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-center text-surface-700 dark:text-surface-600 text-sm font-handwritten">
                  {currentPhoto.caption || 'No caption'}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <AnimatePresence>
                {showControls && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={onPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
                      disabled={currentIndex === 0}
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={onNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
                      disabled={currentIndex === photos.length - 1}
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Bottom Controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent"
              >
                <div className="flex items-center justify-center gap-2">
                  <IconButton
                    icon={<ZoomOut className="w-4 h-4" />}
                    onClick={handleZoomOut}
                    variant="ghost"
                    size="sm"
                    className="bg-black/20 hover:bg-black/40 text-white"
                    disabled={zoom <= 0.5}
                    aria-label="Zoom out"
                  />
                  
                  <div className="px-3 py-1 bg-black/20 text-white text-sm rounded">
                    {Math.round(zoom * 100)}%
                  </div>
                  
                  <IconButton
                    icon={<ZoomIn className="w-4 h-4" />}
                    onClick={handleZoomIn}
                    variant="ghost"
                    size="sm"
                    className="bg-black/20 hover:bg-black/40 text-white"
                    disabled={zoom >= 5}
                    aria-label="Zoom in"
                  />
                  
                  <IconButton
                    icon={<RotateCw className="w-4 h-4" />}
                    onClick={handleResetZoom}
                    variant="ghost"
                    size="sm"
                    className="bg-black/20 hover:bg-black/40 text-white"
                    aria-label="Reset zoom"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}