import { Calculator, TrendingUp } from 'lucide-react'

export default function ROIToolPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">ROI Calculator</h1>
        <p className="text-slate-600">
          Calculate return on investment for construction projects.
        </p>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-12 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Calculator className="w-10 h-10 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Coming Soon: ROI Calculator</h2>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-6">
          This tool will integrate with the <code className="px-2 py-1 bg-white rounded text-sm">@caribbean-azure/roi</code> package
          to provide comprehensive ROI analysis for construction projects.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
          <TrendingUp className="w-4 h-4" />
          <span>Pro Tier Feature</span>
        </div>
      </div>

      {/* Feature Preview */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">Cost Analysis</h3>
          <p className="text-sm text-slate-600">
            Break down project costs including materials, labor, and overhead.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">Revenue Projections</h3>
          <p className="text-sm text-slate-600">
            Forecast revenue streams and profitability over project lifecycle.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">Scenario Planning</h3>
          <p className="text-sm text-slate-600">
            Model different scenarios to optimize project profitability.
          </p>
        </div>
      </div>
    </div>
  )
}
