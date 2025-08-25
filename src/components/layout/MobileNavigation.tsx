'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Image, Heart, Camera, TestTube } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Gallery', href: '/gallery', icon: Image },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Photobooth', href: '/photobooth', icon: Camera },
  { name: 'Test', href: '/test-components', icon: TestTube },
]

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <div className="grid grid-cols-5 h-16">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center space-y-1 transition-colors relative',
                  active 
                    ? 'text-primary-600' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute top-0 left-1/2 w-6 h-0.5 bg-primary-500 rounded-full"
                    style={{ x: '-50%' }}
                    initial={false}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <Icon className={cn('w-5 h-5', active && 'text-primary-600')} />
                  <span className={cn(
                    'text-xs font-medium',
                    active ? 'text-primary-600' : 'text-muted-foreground'
                  )}>
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}