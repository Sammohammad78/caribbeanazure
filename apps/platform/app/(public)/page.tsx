import Link from 'next/link'
import { ArrowRight, LayoutDashboard, Wrench, Calculator } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Caribbean Azure Platform</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Professional construction automation platform for the Caribbean region. Streamline your
            workflow with powerful tools and configurators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-lg font-semibold glow-hover"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {/* Automation Studio */}
          <div className="card-hover bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <LayoutDashboard className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Automation Studio</h3>
            <p className="text-slate-600 mb-4">
              Manage leads, automate workflows, and track project performance from a unified
              dashboard.
            </p>
            <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              Base Tier
            </div>
          </div>

          {/* Tools & Configurators */}
          <div className="card-hover bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">3D Configurators</h3>
            <p className="text-slate-600 mb-4">
              Interactive 3D configurators for sheds, carports, and verandas with real-time BOM
              generation.
            </p>
            <div className="inline-block px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
              Pro Tier
            </div>
          </div>

          {/* ROI Tools */}
          <div className="card-hover bg-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-warm-100 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-warm-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">ROI Calculator</h3>
            <p className="text-slate-600 mb-4">
              Calculate return on investment for construction projects with detailed cost analysis.
            </p>
            <div className="inline-block px-3 py-1 bg-warm-100 text-warm-700 rounded-full text-sm font-medium">
              Pro Tier
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Access the platform and start automating your construction workflows today.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-slate-100 transition-colors text-lg font-semibold"
          >
            Launch Platform
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
