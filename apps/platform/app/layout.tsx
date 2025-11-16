import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'Caribbean Azure Platform | Automation Studio & Configurators',
  description:
    'Professional SaaS platform for Caribbean construction automation. Access the Automation Studio dashboard, 3D configurators for sheds, carports, and verandas, and ROI calculation tools.',
  keywords: [
    'caribbean azure',
    'construction automation',
    'shed configurator',
    'carport configurator',
    'veranda configurator',
    'automation studio',
    'construction saas',
  ],
  themeColor: '#009fe6',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Caribbean Azure Platform',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <Analytics />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-slate-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} Caribbean Azure Platform. All rights reserved.
              </p>
            </div>

            {/* Platform Disclaimer */}
            <div className="max-w-3xl mx-auto bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h4 className="text-sm font-bold text-amber-400 mb-3">⚠️ Platform Notice</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                This platform provides automation tools and configurators that generate{' '}
                <strong>indicative estimates</strong> for construction projects.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Not suitable for final construction plans.</strong> Always consult with
                qualified architects, engineers, and construction professionals for final designs,
                structural calculations, and building permits.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
