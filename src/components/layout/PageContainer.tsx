'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Breadcrumb } from './Breadcrumb'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  showBreadcrumb?: boolean
  breadcrumbItems?: Array<{ label: string; href: string; isCurrentPage?: boolean }>
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'
  padding?: boolean
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  showBreadcrumb = true,
  breadcrumbItems,
  maxWidth = '7xl',
  padding = true,
}) => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen flex flex-col"
    >
      <div className={cn(
        'flex-1 w-full mx-auto',
        maxWidthClasses[maxWidth],
        padding && 'container-padding',
        className
      )}>
        {showBreadcrumb && (
          <div className="py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        )}
        {children}
      </div>
    </motion.div>
  )
}