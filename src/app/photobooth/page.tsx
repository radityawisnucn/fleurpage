import React from 'react'
import { Settings, Camera } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'

export default function PhotoboothPage() {
  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-display-large text-foreground">Photobooth</h1>
            <p className="text-headline-medium text-muted-foreground">
              Capture moments with filters and effects
            </p>
          </div>
          <button className="bg-surface-200 dark:bg-surface-700 text-foreground hover:bg-surface-300 dark:hover:bg-surface-600 font-medium px-4 py-2 rounded-lg transition-all duration-200 inline-flex items-center gap-2 shrink-0">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="bg-surface-100 dark:bg-surface-800 p-12 rounded-2xl border border-border">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8 text-secondary-600" />
            </div>
            <h2 className="text-headline-large">Photobooth Coming Soon</h2>
            <p className="text-body-large text-muted-foreground max-w-md mx-auto">
              Camera interface, filters, effects, and gallery integration are being developed.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}