import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Image } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'

interface YearPageProps {
  params: {
    year: string
  }
}

export default function YearPage({ params }: YearPageProps) {
  const year = params.year

  return (
    <PageContainer 
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Gallery', href: '/gallery' },
        { label: `Year ${year}`, href: `/gallery/${year}`, isCurrentPage: true },
      ]}
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary-500" />
              <h1 className="text-display-large text-foreground">{year}</h1>
            </div>
          </div>
          <button className="bg-primary-500 text-primary-50 hover:bg-primary-600 font-medium px-4 py-2 rounded-lg transition-all duration-200 shrink-0">
            Add Photos
          </button>
        </div>

        {/* Content */}
        <div className="bg-surface-100 dark:bg-surface-800 p-12 rounded-2xl border border-border">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto">
              <Image className="w-8 h-8 text-primary-600" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-headline-large">Photos from {year}</h2>
              <p className="text-body-large text-muted-foreground">
                No photos uploaded for this year yet
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-body-medium text-muted-foreground max-w-md mx-auto">
                Upload your first photo to start building your {year} memory collection. 
                Photos will be displayed in a beautiful polaroid-style layout.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <button className="bg-primary-500 text-primary-50 hover:bg-primary-600 px-4 py-2 rounded-lg transition-all duration-200">
                  Upload Photos
                </button>
                <Link 
                  href="/gallery"
                  className="bg-surface-200 dark:bg-surface-700 text-foreground hover:bg-surface-300 dark:hover:bg-surface-600 px-4 py-2 rounded-lg transition-all duration-200 inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Gallery
                </Link>
              </div>
            </div>

            {/* Year Navigation */}
            <div className="pt-6 border-t border-border">
              <p className="text-body-small text-muted-foreground mb-4">Browse other years:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['2024', '2023', '2022', '2021', '2020'].map((otherYear) => (
                  <Link
                    key={otherYear}
                    href={`/gallery/${otherYear}`}
                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                      otherYear === year
                        ? 'bg-primary-500 text-primary-50'
                        : 'bg-surface-200 dark:bg-surface-700 text-foreground hover:bg-surface-300 dark:hover:bg-surface-600'
                    }`}
                  >
                    {otherYear}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}