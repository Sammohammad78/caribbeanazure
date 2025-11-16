/**
 * Lead Capture API
 * Handles lead submissions with validation and mock storage
 *
 * TODO: Integrate with real database (Supabase/Prisma)
 * TODO: Integrate with email service (Resend/SendGrid)
 * TODO: Add to automation workflows
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { saveLead, type LeadData } from '@/lib/mocks/leads'

// Validation schema
const leadSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  productType: z.enum(['shed', 'carport', 'veranda']),
  message: z.string().optional(),
  configData: z.any().optional(),
  quoteId: z.string().optional(),
  source: z.enum(['website', 'whatsapp', 'direct', 'configurator']).default('website'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = leadSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const leadData: LeadData = validationResult.data

    // Save to mock storage (replace with real database)
    const lead = await saveLead(leadData)

    console.log('✅ Lead created:', lead.id)

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer
    // TODO: Add to automation workflow

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Your request has been received. We will contact you shortly!',
    })
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/leads
 * Returns list of leads (for dashboard)
 */
export async function GET() {
  try {
    // TODO: Add authentication/authorization
    // TODO: Add pagination
    // TODO: Add filtering

    return NextResponse.json({
      success: true,
      leads: [],
      message: 'Lead listing not yet implemented',
    })
  } catch (error) {
    console.error('Lead GET error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred',
      },
      { status: 500 }
    )
  }
}
