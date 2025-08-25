'use client'

import React, { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

export default function TestLayoutPage() {
  const [customBreadcrumb, setCustomBreadcrumb] = useState(false)

  const customBreadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/test-components' },
    { label: 'Layout Test', href: '/test-layout', isCurrentPage: true },
  ]

  return (
    <PageContainer 
      showBreadcrumb={true}
      breadcrumbItems={customBreadcrumb ? customBreadcrumbItems : undefined}
    >
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-display-large mb-4">Layout Components Test</h1>
          <p className="text-headline-medium text-muted-foreground">
            Testing all layout components functionality
          </p>
        </div>

        {/* Theme Toggle Test */}
        <section className="card-base p-8">
          <h2 className="text-headline-large mb-6">Theme Toggle</h2>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <p className="text-body-medium text-muted-foreground">
              Click to cycle through light → dark → system themes
            </p>
          </div>
        </section>

        {/* Breadcrumb Test */}
        <section className="card-base p-8">
          <h2 className="text-headline-large mb-6">Breadcrumb Navigation</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-headline-small">Current Page Breadcrumb</h3>
              <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-lg">
                <Breadcrumb />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h3 className="text-headline-small">Custom Breadcrumb</h3>
                <button
                  onClick={() => setCustomBreadcrumb(!customBreadcrumb)}
                  className="text-sm bg-primary-500 text-primary-50 hover:bg-primary-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Toggle Custom
                </button>
              </div>
              <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-lg">
                <Breadcrumb items={customBreadcrumb ? customBreadcrumbItems : undefined} />
              </div>
            </div>
          </div>
        </section>

        {/* Container Variants Test */}
        <section className="card-base p-8">
          <h2 className="text-headline-large mb-6">Container Variants</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary-50 dark:bg-primary-950 p-4 rounded-lg text-center">
                <p className="text-body-small text-primary-700 dark:text-primary-300">Default Container</p>
                <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Max Width: 7xl</p>
              </div>
              <div className="bg-secondary-50 dark:bg-secondary-950 p-4 rounded-lg text-center">
                <p className="text-body-small text-secondary-700 dark:text-secondary-300">Responsive</p>
                <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">Adaptive Padding</p>
              </div>
              <div className="bg-accent-50 dark:bg-accent-950 p-4 rounded-lg text-center">
                <p className="text-body-small text-accent-700 dark:text-accent-300">Animated</p>
                <p className="text-xs text-accent-600 dark:text-accent-400 mt-1">Page Transitions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Features */}
        <section className="card-base p-8">
          <h2 className="text-headline-large mb-6">Layout Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-primary-600 font-bold">📱</span>
              </div>
              <h3 className="text-headline-small">Mobile First</h3>
              <p className="text-body-small text-muted-foreground">
                Responsive design with mobile navigation
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-secondary-600 font-bold">🌙</span>
              </div>
              <h3 className="text-headline-small">Dark Mode</h3>
              <p className="text-body-small text-muted-foreground">
                System preference with manual override
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-accent-600 font-bold">✨</span>
              </div>
              <h3 className="text-headline-small">Animations</h3>
              <p className="text-body-small text-muted-foreground">
                Smooth transitions with Framer Motion
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  )
}