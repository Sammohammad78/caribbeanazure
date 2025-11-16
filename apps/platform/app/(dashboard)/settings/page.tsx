import { Settings, User, Bell, Lock, CreditCard } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account and platform preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Profile Settings</h2>
          </div>
          <p className="text-slate-600">Profile settings will be available in the next release.</p>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-accent-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Notifications</h2>
          </div>
          <p className="text-slate-600">Notification preferences will be available in the next release.</p>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-warm-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-warm-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Security</h2>
          </div>
          <p className="text-slate-600">Security settings will be available in the next release.</p>
        </div>

        {/* Billing */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-slate-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Billing & Subscription</h2>
          </div>
          <p className="text-slate-600">Billing and subscription management will be available in the next release.</p>
        </div>
      </div>
    </div>
  )
}
