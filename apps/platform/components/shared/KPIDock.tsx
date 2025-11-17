'use client'

import { Info } from 'lucide-react'

interface KPIItem {
  label: string
  value: string | number
  unit?: string
  info?: string
}

interface KPIDockProps {
  items: KPIItem[]
  title?: string
}

export function KPIDock({ items, title = 'Summary' }: KPIDockProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">{item.label}</span>
              {item.info && (
                <div className="group relative">
                  <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                  <div className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-48 p-2 bg-slate-900 text-white text-xs rounded shadow-lg z-10">
                    {item.info}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-slate-900">{item.value}</span>
              {item.unit && <span className="text-sm text-slate-500">{item.unit}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
