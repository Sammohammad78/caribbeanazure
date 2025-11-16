import { Navigation } from '@/components/dashboard/Navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="pt-16">
        {children}
      </div>
    </div>
  )
}
