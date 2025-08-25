import React from 'react'
import Link from 'next/link'
import { Plus, Image } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'

export default function GalleryPage() {
  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-display-large text-foreground">Photo Gallery</h1>
            <p className="text-headline-medium text-muted-foreground">
              Your beautiful polaroid memories organized by year
            </p>
          </div>
          <button className="bg-primary-500 text-primary-50 hover:bg-primary-600 font-medium px-4 py-2 rounded-lg transition-all duration-200 inline-flex items-center gap-2 shrink-0">
            <Plus className="w-4 h-4" />
            Add Photo
          </button>
        </div>

        {/* Content */}
        <div className="bg-surface-100 dark:bg-surface-800 p-12 rounded-2xl border border-border">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto">
              <Image className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-headline-large">Gallery Coming Soon</h2>
            <p className="text-body-large text-muted-foreground max-w-md mx-auto">
              Beautiful polaroid layouts, year navigation, and drag & drop uploads are being implemented.
            </p>
            
            {/* Year Navigation Preview */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <Link 
                href="/gallery/2024"
                className="bg-primary-500 text-primary-50 hover:bg-primary-600 px-4 py-2 rounded-lg transition-all duration-200"
              >
                2024
              </Link>
              <Link 
                href="/gallery/2023"
                className="bg-surface-200 dark:bg-surface-700 text-foreground hover:bg-surface-300 dark:hover:bg-surface-600 px-4 py-2 rounded-lg transition-all duration-200"
              >
                2023
              </Link>
              <Link 
                href="/gallery/2022"
                className="bg-surface-200 dark:bg-surface-700 text-foreground hover:bg-surface-300 dark:hover:bg-surface-600 px-4 py-2 rounded-lg transition-all duration-200"
              >
                2022
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}