import React from 'react'
import { Plus, Heart } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'

export default function WishlistPage() {
  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-display-large text-foreground">Couple Wishlist</h1>
            <p className="text-headline-medium text-muted-foreground">
              Share your dreams and goals together
            </p>
          </div>
          <button className="bg-accent-500 text-accent-50 hover:bg-accent-600 font-medium px-4 py-2 rounded-lg transition-all duration-200 inline-flex items-center gap-2 shrink-0">
            <Plus className="w-4 h-4" />
            Add Wish
          </button>
        </div>

        {/* Content */}
        <div className="bg-surface-100 dark:bg-surface-800 p-12 rounded-2xl border border-border">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-accent-600" />
            </div>
            <h2 className="text-headline-large">Wishlist Coming Soon</h2>
            <p className="text-body-large text-muted-foreground max-w-md mx-auto">
              Couple profiles, categories, achievement tracking, and goal sharing features are in development.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}