'use client'

/**
 * Carport Configurator Page
 *
 * 3D configurator for custom carport designs
 * TODO: Integrate with @caribbean-azure/configurator-engine for calculations
 * TODO: Extract shared R3F viewer to components/r3f/Viewer3D.tsx
 */

import { useState } from 'react'
import { Car, Download, RotateCcw, AlertTriangle } from 'lucide-react'
import { ExportButton } from '@/components/shared/ExportButton'
import { KPIDock } from '@/components/shared/KPIDock'

// TODO: Import from @caribbean-azure/configurator-engine/carport
// import { CarportConfiguration, calculateCarportBOM, validateCarportConfig } from '@caribbean-azure/configurator-engine/carport'

interface CarportConfig {
  width: number
  depth: number
  height: number
  roofType: 'flat' | 'mono' | 'gabled'
  roofMaterial: 'polycarbonate' | 'steel' | 'aluminum'
  posts: number
  sidePanels: boolean
  ledLighting: boolean
  gutters: boolean
  color: string
}

const DEFAULT_CONFIG: CarportConfig = {
  width: 3.5,
  depth: 5.5,
  height: 2.4,
  roofType: 'mono',
  roofMaterial: 'polycarbonate',
  posts: 4,
  sidePanels: false,
  ledLighting: false,
  gutters: true,
  color: 'RAL 9005',
}

export default function CarportConfiguratorPage() {
  const [config, setConfig] = useState<CarportConfig>(DEFAULT_CONFIG)

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG)
  }

  // TODO: Replace with actual calculations from configurator engine
  const area = config.width * config.depth
  const roofArea = area * (config.roofType === 'gabled' ? 1.15 : 1.0)

  const kpiItems = [
    { label: 'Coverage Area', value: area.toFixed(1), unit: 'm²' },
    { label: 'Roof Area', value: roofArea.toFixed(1), unit: 'm²' },
    { label: 'Height', value: config.height.toFixed(1), unit: 'm' },
    { label: 'Posts', value: config.posts, unit: 'pcs' },
    { label: 'Roof Type', value: config.roofType, unit: '' },
  ]

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-accent-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Carport Configurator</h1>
              <p className="text-sm text-slate-600">Design your custom carport in 3D</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <ExportButton data={config} filename="carport-config" format="json" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Controls */}
        <aside className="w-80 bg-white border-r border-slate-200 flex-shrink-0 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Dimensions */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Dimensions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Width (m)
                  </label>
                  <input
                    type="number"
                    value={config.width}
                    onChange={(e) => setConfig({ ...config, width: parseFloat(e.target.value) || 0 })}
                    min="2.5"
                    max="7"
                    step="0.5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Depth (m)
                  </label>
                  <input
                    type="number"
                    value={config.depth}
                    onChange={(e) => setConfig({ ...config, depth: parseFloat(e.target.value) || 0 })}
                    min="4"
                    max="7"
                    step="0.5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Height (m)
                  </label>
                  <input
                    type="number"
                    value={config.height}
                    onChange={(e) => setConfig({ ...config, height: parseFloat(e.target.value) || 0 })}
                    min="2.1"
                    max="3"
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>
              </div>
            </div>

            {/* Roof Configuration */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Roof Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Roof Type
                  </label>
                  <select
                    value={config.roofType}
                    onChange={(e) => setConfig({ ...config, roofType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  >
                    <option value="flat">Flat (0°)</option>
                    <option value="mono">Mono-slope (3-15°)</option>
                    <option value="gabled">Gabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Roof Material
                  </label>
                  <select
                    value={config.roofMaterial}
                    onChange={(e) => setConfig({ ...config, roofMaterial: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  >
                    <option value="polycarbonate">Polycarbonate Panels</option>
                    <option value="steel">Steel Sheets</option>
                    <option value="aluminum">Aluminum Panels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Color (RAL)
                  </label>
                  <select
                    value={config.color}
                    onChange={(e) => setConfig({ ...config, color: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  >
                    <option value="RAL 9005">RAL 9005 - Jet Black</option>
                    <option value="RAL 7016">RAL 7016 - Anthracite Grey</option>
                    <option value="RAL 9010">RAL 9010 - Pure White</option>
                    <option value="RAL 8014">RAL 8014 - Sepia Brown</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Options</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.gutters}
                    onChange={(e) => setConfig({ ...config, gutters: e.target.checked })}
                    className="w-4 h-4 text-accent-600 rounded focus:ring-accent-500"
                  />
                  <span className="text-sm text-slate-700">Gutters & Downspouts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.ledLighting}
                    onChange={(e) => setConfig({ ...config, ledLighting: e.target.checked })}
                    className="w-4 h-4 text-accent-600 rounded focus:ring-accent-500"
                  />
                  <span className="text-sm text-slate-700">LED Lighting</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.sidePanels}
                    onChange={(e) => setConfig({ ...config, sidePanels: e.target.checked })}
                    className="w-4 h-4 text-accent-600 rounded focus:ring-accent-500"
                  />
                  <span className="text-sm text-slate-700">Side Panels</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Viewer Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 bg-gradient-to-br from-accent-50 to-slate-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Car className="w-12 h-12 text-accent-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">3D Viewer Coming Soon</h2>
              <p className="text-slate-600 max-w-md">
                Carport visualization will use the shared R3F viewer component
              </p>
              <div className="mt-4 text-sm text-slate-500">
                <code className="px-2 py-1 bg-white rounded">components/r3f/Viewer3D.tsx</code>
              </div>
            </div>
          </div>

          <div className="bg-white border-t border-slate-200 p-4">
            <KPIDock items={kpiItems} title="Carport Summary" />
          </div>
        </main>

        {/* Right Panel - BOM */}
        <aside className="w-80 bg-white border-l border-slate-200 flex-shrink-0 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Bill of Materials</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Engine Integration Required</p>
                  <p className="text-blue-700">
                    Carport BOM from <code className="text-xs bg-blue-100 px-1 rounded">@caribbean-azure/configurator-engine/carport</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Steel Posts</span>
                <span className="font-medium">{config.posts} pcs</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Roof Panels</span>
                <span className="font-medium">-- m²</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Beams & Purlins</span>
                <span className="font-medium">-- m</span>
              </div>
              {config.gutters && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Gutters</span>
                  <span className="font-medium">-- m</span>
                </div>
              )}
              {config.ledLighting && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">LED Strips</span>
                  <span className="font-medium">-- m</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
