import { LayoutDashboard, Users, FileText, TrendingUp, Zap, Clock } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Automation Studio</h1>
        <p className="text-slate-600">
          Welcome to your automation dashboard. Manage leads, playbooks, and track performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-sm text-accent-600 font-medium">+12%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">248</p>
          <p className="text-sm text-slate-600">Active Leads</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent-600" />
            </div>
            <span className="text-sm text-accent-600 font-medium">+8%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">156</p>
          <p className="text-sm text-slate-600">Quotes Sent</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-warm-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-warm-600" />
            </div>
            <span className="text-sm text-accent-600 font-medium">+24%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">32%</p>
          <p className="text-sm text-slate-600">Conversion Rate</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-slate-600" />
            </div>
            <span className="text-sm text-accent-600 font-medium">+5%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">18</p>
          <p className="text-sm text-slate-600">Active Playbooks</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">Lead #{1000 + i}</p>
                  <p className="text-sm text-slate-600">Shed configurator inquiry</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>{i}h ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Automation Playbooks</h2>
          <div className="space-y-3">
            {['Lead Follow-up Sequence', 'Quote Reminder Campaign', 'Post-Sale Nurture'].map((name, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">{name}</p>
                  <p className="text-sm text-slate-600">{Math.floor(Math.random() * 50) + 10} active contacts</p>
                </div>
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placeholder Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Dashboard Under Development</h3>
        <p className="text-blue-700">
          This is a placeholder dashboard. Full automation features including lead management,
          playbook execution, and detailed analytics will be implemented in the next phase.
        </p>
      </div>
    </div>
  )
}
