import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



================================================
FILE: lib/interaction/pointer-store.ts
================================================
/**
 * Predictive Pointer Store
 * Critically damped spring with velocity lead for lag-free tracking
 * No reverse-direction lag on rapid mouse movements
 */

export interface PointerState {
  /** Current X position in pixels */
  x: number
  /** Current Y position in pixels */
  y: number
  /** Velocity X in pixels/second */
  vx: number
  /** Velocity Y in pixels/second */
  vy: number
  /** Timestamp of last update */
  t: number
}

let state: PointerState = {
  x: 0,
  y: 0,
