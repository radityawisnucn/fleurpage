'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Edit3, Heart, Download, Share, Trash2, RotateCw } from 'lucide-react'
import { cn, getRandomRotation } from '@/lib/utils'
import type { Photo } from '@/types/gallery'

interface PolaroidCardProps {
  photo: Photo
  onEdit?: (photo: Photo) => void
  onDelete?: (photo: Photo) => void
  onView?: (photo: Photo) => void
  onToggleFavorite?: (photo: Photo) => void
  className?: string
  isDragging?: boolean
  style?: React.CSSProperties
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  photo,
  onEdit,
  onDelete,
  onView,
  onToggleFavorite,
  className,
  isDragging = false,
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [rotation] = useState<string | number>(() => photo.rotationAngle || getRandomRotation())
  const rotationValue = typeof rotation === 'string' ? parseFloat(rotation) : rotation
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDoubleClick = () => {
    if (onView) onView(photo)
  }

  const handleEditCaption = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) onEdit(photo)
  }

  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotate: rotationValue - 20,
      y: -50,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: rotationValue,
      y: 0,
      transition: {
        type: "spring" as const,
        duration: 0.8,
        bounce: 0.4,
      },
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      y: -10,
      zIndex: 10,
      transition: {
        type: "spring" as const,
        duration: 0.3,
      },
    },
    drag: {
      scale: 1.1,
      rotate: 0,
      zIndex: 20,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2, type: "tween" as const }
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'absolute cursor-pointer select-none',
        isDragging && 'z-20',
        className
      )}
      style={style}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileDrag="drag"
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
      layout
    >
      {/* Polaroid Frame */}
      <div className="bg-white dark:bg-surface-100 p-3 pb-12 rounded-lg shadow-polaroid hover:shadow-polaroid-hover transition-shadow duration-300 relative overflow-hidden">
        {/* Image Container */}
        <div className="relative w-48 h-48 bg-surface-100 dark:bg-surface-200 rounded overflow-hidden">
          {photo.url ? (
            <Image
              src={photo.url}
              alt={photo.caption || `Photo from ${photo.year}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 192px"
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800" />
          )}

          {/* Favorite Indicator */}
          {photo.isFavorite && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-2 right-2"
            >
              <Heart className="w-4 h-4 text-red-500 fill-current drop-shadow-sm" />
            </motion.div>
          )}

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
              >
                <div className="flex gap-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onToggleFavorite) onToggleFavorite(photo)
                    }}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Toggle favorite"
                  >
                    <Heart className={cn(
                      'w-4 h-4 transition-colors',
                      photo.isFavorite ? 'text-red-500 fill-current' : 'text-surface-600'
                    )} />
                  </motion.button>
                  
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onView) onView(photo)
                    }}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="View photo"
                  >
                    <RotateCw className="w-4 h-4 text-surface-600" />
                  </motion.button>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onDelete) onDelete(photo)
                    }}
                    className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Delete photo"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Caption */}
        <motion.div
          className="absolute bottom-3 left-3 right-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div
            className="text-center text-surface-700 dark:text-surface-600 text-sm font-handwritten cursor-text hover:bg-surface-50 dark:hover:bg-surface-200 rounded px-1 py-0.5 transition-colors"
            onClick={handleEditCaption}
            style={{ fontFamily: 'Kalam, cursive' }}
          >
            {photo.caption || 'Add a caption...'}
          </div>
        </motion.div>

        {/* Date stamp (optional) */}
        {photo.takenAt && (
          <div className="absolute bottom-1 right-3 text-xs text-surface-400 font-mono">
            {new Date(photo.takenAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}