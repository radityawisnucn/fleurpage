'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react'

interface YearData {
  year: number
  photoCount: number
  isActive?: boolean
}

interface YearSelectorProps {
  years: YearData[]
  currentYear?: number
  onYearChange?: (year: number) => void
  className?: string
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  years,
  currentYear,
  onYearChange,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  const getCurrentYear = () => {
    if (currentYear) return currentYear
    const match = pathname.match(/\/gallery\/(\d{4})/)
    return match ? parseInt(match[1]) : new Date().getFullYear()
  }

  const activeYear = getCurrentYear()

  const sortedYears = [...years].sort((a, b) => b.year - a.year)

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const yearVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        duration: 0.4,
      },
    },
  }

  return (
    <motion.div
      className={`bg-card border border-border rounded-2xl p-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-500" />
          <h2 className="text-headline-medium font-semibold">Timeline</h2>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
          aria-label={isExpanded ? 'Collapse timeline' : 'Expand timeline'}
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Years Grid */}
      <div className={`grid gap-3 transition-all duration-300 ${
        isExpanded 
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2'
      }`}>
        <AnimatePresence>
          {sortedYears.map((yearData) => {
            const isCurrentYear = yearData.year === activeYear
            
            return (
              <motion.div
                key={yearData.year}
                variants={yearVariants}
                layout
                className="relative"
              >
                <Link
                  href={`/gallery/${yearData.year}`}
                  className={`block p-4 rounded-xl transition-all duration-200 relative overflow-hidden group ${
                    isCurrentYear
                      ? 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-200 dark:border-primary-800'
                      : 'bg-surface-50 dark:bg-surface-800 hover:bg-surface-100 dark:hover:bg-surface-700 border-2 border-transparent'
                  }`}
                  onClick={() => onYearChange?.(yearData.year)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-headline-small font-bold ${
                        isCurrentYear 
                          ? 'text-primary-700 dark:text-primary-300' 
                          : 'text-foreground'
                      }`}>
                        {yearData.year}
                      </span>
                      {isCurrentYear && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-2 h-2 bg-primary-500 rounded-full"
                        />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-body-small ${
                        isCurrentYear
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-muted-foreground'
                      }`}>
                        {yearData.photoCount} photo{yearData.photoCount !== 1 ? 's' : ''}
                      </span>
                      
                      {yearData.photoCount === 0 && (
                        <Plus className={`w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity ${
                          isCurrentYear ? 'text-primary-500' : 'text-muted-foreground'
                        }`} />
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isCurrentYear ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Summary Stats */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-4 border-t border-border"
        >
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-headline-medium font-bold text-primary-500">
                {sortedYears.length}
              </div>
              <div className="text-body-small text-muted-foreground">Years</div>
            </div>
            <div>
              <div className="text-headline-medium font-bold text-accent-500">
                {sortedYears.reduce((total, year) => total + year.photoCount, 0)}
              </div>
              <div className="text-body-small text-muted-foreground">Total Photos</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}