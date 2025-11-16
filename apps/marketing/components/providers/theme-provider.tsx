"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}




================================================
FILE: components/roi/RoiCalculator.tsx
================================================
'use client'

/**
 * Universal ROI Calculator - Internationalized
 * Supports NL/EN with locale-aware formatting and presets
 */

import * as React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { ArrowRight, Download, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RoiCalculatorProps } from './types'
import { DEFAULT_INPUTS, PRESET_INPUTS } from './types'
import {
  calculateRoi,
  validateInputs,
