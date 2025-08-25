import React from 'react'
import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto container-padding">
        <div className="space-y-4">
          <h1 className="text-display-medium text-foreground">404</h1>
          <div className="space-y-2">
            <h2 className="text-headline-large text-foreground">
              Page not found
            </h2>
            <p className="text-body-large text-muted-foreground">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 bg-primary-500 text-primary-50 hover:bg-primary-600 font-medium px-6 py-3 rounded-xl transition-all duration-200">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <Link href="/gallery" className="inline-flex items-center justify-center gap-2 hover:bg-surface-100 dark:hover:bg-surface-800 font-medium px-6 py-3 rounded-xl transition-all duration-200">
            <Search className="w-4 h-4" />
            Browse Gallery
          </Link>
        </div>
      </div>
    </div>
  )
}