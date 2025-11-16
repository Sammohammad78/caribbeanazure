/**
 * Health Check Endpoint
 *
 * Simple health check for monitoring platform status.
 * Returns basic system information and uptime.
 */

import { NextResponse } from 'next/server'

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  version?: string
}

/**
 * GET /api/health
 */
export async function GET() {
  const startTime = Date.now()

  const response: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.VERCEL_GIT_COMMIT_SHA || process.env.npm_package_version || 'dev',
  }

  return NextResponse.json(response, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Health-Status': response.status,
      'X-Response-Time': `${Date.now() - startTime}ms`,
    },
  })
}
