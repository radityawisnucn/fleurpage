'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Code, Coffee, Github, Twitter, Mail } from 'lucide-react'

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'Email', href: 'mailto:hello@example.com', icon: Mail },
]

const footerLinks = [
  {
    title: 'Features',
    links: [
      { name: 'Gallery', href: '/gallery' },
      { name: 'Wishlist', href: '/wishlist' },
      { name: 'Photobooth', href: '/photobooth' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'Privacy', href: '#' },
    ]
  },
  {
    title: 'Developer',
    links: [
      { name: 'Test Components', href: '/test-components' },
      { name: 'API', href: '#' },
      { name: 'GitHub', href: '#' },
    ]
  }
]

export const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="bg-surface-50 dark:bg-surface-900 border-t border-border mt-auto">
      <div className="container mx-auto container-padding">
        {/* Main Footer Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">Personal Gallery</span>
            </div>
            <p className="text-body-medium text-muted-foreground mb-6 max-w-sm">
              Capture, organize, and cherish your memories with beautiful polaroid-style galleries and shared wishlists.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-body-medium text-muted-foreground hover:text-primary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Footer */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-body-small text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500" />
            <span>using</span>
            <Code className="w-3 h-3" />
            <span>Next.js, TypeScript & Tailwind CSS</span>
          </div>
          
          <div className="flex items-center gap-4 text-body-small text-muted-foreground">
            <div className="flex items-center gap-1">
              <Coffee className="w-3 h-3" />
              <span>Powered by coffee</span>
            </div>
            <span>© 2024 Personal Gallery</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}