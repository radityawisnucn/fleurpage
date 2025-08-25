import React from 'react'
import { Image } from 'lucide-react'

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <nav className="container-padding py-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="h-4 w-24 bg-surface-200 dark:bg-surface-700 rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-surface-200 dark:bg-surface-700 rounded animate-pulse"></div>
          <div className="h-10 w-28 bg-surface-200 dark:bg-surface-700 rounded animate-pulse"></div>
        </div>
      </nav>

      <div className="container mx-auto container-padding section-padding">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto">
              <Image className="w-8 h-8 text-primary-600 animate-pulse" />
            </div>
            <div className="h-12 w-48 bg-surface-200 dark:bg-surface-700 rounded mx-auto animate-pulse"></div>
            <div className="h-6 w-96 bg-surface-200 dark:bg-surface-700 rounded mx-auto animate-pulse"></div>
          </div>
          
          <div className="bg-surface-100 dark:bg-surface-800 p-12 rounded-2xl border border-border">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}