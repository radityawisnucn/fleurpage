import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a random rotation between -5 and 5 degrees for polaroid effect
 * @param seed Optional seed value to generate consistent rotation for the same image
 * @returns A CSS rotation value as a string (e.g. "-2.5deg")
 */
export function getRandomRotation(seed?: string | number): string {
  // If a seed is provided, use it to generate a deterministic rotation
  if (seed !== undefined) {
    // Simple hash function for strings or convert number to string
    let hashValue: number;
    
    if (typeof seed === 'string') {
      hashValue = seed.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);
    } else {
      hashValue = seed;
    }
    
    // Use the hash to generate a value between -5 and 5
    const rotation = ((hashValue % 101) / 10) - 5;
    return `${rotation.toFixed(1)}deg`;
  }
  
  // Without seed, generate a random rotation
  const rotation = (Math.random() * 10 - 5).toFixed(1);
  return `${rotation}deg`;
}

/**
 * Generate a random position within container boundaries
 * @param maxX Maximum X position (container width - element width)
 * @param maxY Maximum Y position (container height - element height)
 * @param elementWidth Width of the element to position
 * @param elementHeight Height of the element to position
 * @returns An object with x and y coordinates
 */
export function getRandomPosition(
  maxX: number,
  maxY: number,
  elementWidth: number = 0,
  elementHeight: number = 0
): { x: number; y: number } {
  // Add some padding to avoid elements positioned too close to edges
  const padding = 20;
  
  // Generate random x and y within the available space
  const x = Math.random() * (Math.max(0, maxX - padding * 2)) + padding;
  const y = Math.random() * (Math.max(0, maxY - padding * 2)) + padding;
  
  return { x, y };
}

/**
 * Generate a unique ID with an optional prefix
 * @param prefix Optional string prefix for the ID
 * @returns A unique string ID
 */
export function generateId(prefix: string = 'id'): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${timestamp}_${randomPart}`;
}

/**
 * Format file size in bytes to a human-readable string
 * @param bytes File size in bytes
 * @param decimals Number of decimal places to show
 * @returns A formatted string representation of the file size
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
