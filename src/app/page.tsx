'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Heart, Image, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PageContainer } from '@/components/layout/PageContainer'

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <PageContainer showBreadcrumb={false} className="section-padding">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-display-large text-foreground">
              Your Personal
              <span className="text-primary-500"> Memory Gallery</span>
            </h1>
            
            <p className="text-headline-medium text-muted-foreground max-w-3xl mx-auto">
              Capture, organize, and cherish your memories with beautiful polaroid-style galleries, 
              couple wishlists, and an integrated photobooth experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/gallery" className="bg-primary-500 text-primary-50 hover:bg-primary-600 font-medium px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center gap-2">
              Start Exploring
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="hover:bg-surface-100 dark:hover:bg-surface-800 font-medium px-6 py-3 rounded-xl transition-all duration-200">
              Learn More
            </button>
          </div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-headline-large text-primary-500 font-bold">1000+</div>
              <div className="text-body-medium text-muted-foreground">Photos</div>
            </div>
            <div className="text-center">
              <div className="text-headline-large text-accent-500 font-bold">50+</div>
              <div className="text-body-medium text-muted-foreground">Wishes Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-headline-large text-secondary-500 font-bold">5</div>
              <div className="text-body-medium text-muted-foreground">Years of Memories</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-small mb-4">Amazing Features</h2>
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, organize, and share your precious memories
          </p>
        </motion.div>

        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Gallery Feature */}
          <motion.div
            variants={fadeInUp}
            className="card-interactive p-6 text-center"
          >
            <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Image className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-headline-small mb-2">Polaroid Gallery</h3>
            <p className="text-body-medium text-muted-foreground">
              Beautiful polaroid-style photo gallery with yearly organization
            </p>
          </motion.div>

          {/* Wishlist Feature */}
          <motion.div
            variants={fadeInUp}
            className="card-interactive p-6 text-center"
          >
            <div className="bg-accent-100 dark:bg-accent-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-accent-600" />
            </div>
            <h3 className="text-headline-small mb-2">Couple Wishlist</h3>
            <p className="text-body-medium text-muted-foreground">
              Share dreams and goals with your partner in organized wishlists
            </p>
          </motion.div>

          {/* Photobooth Feature */}
          <motion.div
            variants={fadeInUp}
            className="card-interactive p-6 text-center"
          >
            <div className="bg-secondary-100 dark:bg-secondary-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-secondary-600" />
            </div>
            <h3 className="text-headline-small mb-2">Photobooth</h3>
            <p className="text-body-medium text-muted-foreground">
              Capture moments with filters and effects, save as polaroids
            </p>
          </motion.div>

          {/* Effects Feature */}
          <motion.div
            variants={fadeInUp}
            className="card-interactive p-6 text-center"
          >
            <div className="bg-surface-100 dark:bg-surface-800 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-surface-600" />
            </div>
            <h3 className="text-headline-small mb-2">Smooth Animations</h3>
            <p className="text-body-medium text-muted-foreground">
              Beautiful transitions and interactions powered by Framer Motion
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Testing Section */}
      <section className="mb-20">
        <div className="text-center space-y-8">
          <motion.h2 
            {...fadeInUp}
            className="text-display-medium"
          >
            Test Components & Styling
          </motion.h2>
          
          {/* Color Palette Test */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="bg-primary-500 h-24 rounded-xl flex items-center justify-center text-white font-semibold">
              Primary
            </div>
            <div className="bg-secondary-500 h-24 rounded-xl flex items-center justify-center text-white font-semibold">
              Secondary
            </div>
            <div className="bg-accent-500 h-24 rounded-xl flex items-center justify-center text-white font-semibold">
              Accent
            </div>
            <div className="bg-surface-500 h-24 rounded-xl flex items-center justify-center text-white font-semibold">
              Surface
            </div>
          </motion.div>

          {/* Button Tests */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="space-x-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-ghost">Ghost Button</button>
            </div>
          </motion.div>

          {/* Polaroid Frame Test */}
          <motion.div 
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -10, rotate: 2 }}
            className="polaroid-frame w-64 mx-auto"
          >
            <div className="polaroid-image bg-gradient-to-br from-primary-400 to-accent-500"></div>
            <div className="polaroid-caption">Sample Polaroid Frame</div>
          </motion.div>

          {/* Interactive Card Test */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="card-interactive max-w-sm mx-auto p-6"
          >
            <h3 className="text-headline-small mb-2">Interactive Card</h3>
            <p className="text-body-medium text-muted-foreground mb-4">
              This card demonstrates hover effects and smooth transitions with Framer Motion.
            </p>
            <button className="btn-primary">Click Me</button>
          </motion.div>
        </div>
      </section>
    </PageContainer>
  )
}