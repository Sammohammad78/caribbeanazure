'use client'

/**
 * Shed Configurator Page
 *
 * 3D configurator for custom shed designs
 * TODO: Integrate with @caribbean-azure/configurator-engine for calculations
 * TODO: Extract shared R3F viewer to components/r3f/Viewer3D.tsx
 */

import { useState } from 'react'
import { Box, Download, RotateCcw, AlertTriangle } from 'lucide-react'
import { ExportButton } from '@/components/shared/ExportButton'
import { KPIDock } from '@/components/shared/KPIDock'

// TODO: Import from @caribbean-azure/configurator-engine/shed
// import { ShedConfiguration, calculateShedBOM, validateShedConfig } from '@caribbean-azure/configurator-engine/shed'
// import { DEFAULT_SHED_CONFIG, SHED_PRESETS } from '@caribbean-azure/configurator-engine/shed/presets'

// Temporary mock configuration
interface ShedConfig {
  width: number
  depth: number
  height: number
  roofType: 'flat' | 'gable' | 'mono'
  wallMaterial: string
  roofMaterial: string
  doors: number
  windows: number
}

const DEFAULT_CONFIG: ShedConfig = {
  width: 3,
  depth: 2.5,
  height: 2.5,
  roofType: 'gable',
  wallMaterial: 'wood-siding',
  roofMaterial: 'shingles',
  doors: 1,
  windows: 2,
}

export default function ShedConfiguratorPage() {
  const [config, setConfig] = useState<ShedConfig>(DEFAULT_CONFIG)

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG)
  }

  // TODO: Replace with actual calculations from configurator engine
  const area = config.width * config.depth
  const volume = config.width * config.depth * config.height
  const wallArea = 2 * (config.width + config.depth) * config.height

  const kpiItems = [
    { label: 'Floor Area', value: area.toFixed(1), unit: 'm²' },
    { label: 'Volume', value: volume.toFixed(1), unit: 'm³' },
    { label: 'Wall Area', value: wallArea.toFixed(1), unit: 'm²' },
    { label: 'Doors', value: config.doors, unit: 'pcs' },
    { label: 'Windows', value: config.windows, unit: 'pcs' },
  ]

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Box className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Shed Configurator</h1>
              <p className="text-sm text-slate-600">Design your custom shed in 3D</p>
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
            <ExportButton data={config} filename="shed-config" format="json" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Controls */}
        <aside className="w-80 bg-white border-r border-slate-200 flex-shrink-0 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Geometry Controls */}
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
                    min="1"
                    max="10"
                    step="0.5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    min="1"
                    max="10"
                    step="0.5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    min="2"
                    max="4"
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Roof Type
                  </label>
                  <select
                    value={config.roofType}
                    onChange={(e) => setConfig({ ...config, roofType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="flat">Flat</option>
                    <option value="gable">Gable</option>
                    <option value="mono">Mono-slope</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Openings Controls */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Openings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Doors
                  </label>
                  <input
                    type="number"
                    value={config.doors}
                    onChange={(e) => setConfig({ ...config, doors: parseInt(e.target.value) || 0 })}
                    min="0"
                    max="4"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Windows
                  </label>
                  <input
                    type="number"
                    value={config.windows}
                    onChange={(e) => setConfig({ ...config, windows: parseInt(e.target.value) || 0 })}
                    min="0"
                    max="8"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Materials</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Wall Material
                  </label>
                  <select
                    value={config.wallMaterial}
                    onChange={(e) => setConfig({ ...config, wallMaterial: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="wood-siding">Wood Siding</option>
                    <option value="metal">Metal Panels</option>
                    <option value="vinyl">Vinyl Siding</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Roof Material
                  </label>
                  <select
                    value={config.roofMaterial}
                    onChange={(e) => setConfig({ ...config, roofMaterial: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="shingles">Asphalt Shingles</option>
                    <option value="metal">Metal Roofing</option>
                    <option value="tiles">Roof Tiles</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Viewer Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* 3D Viewer Placeholder */}
          <div className="flex-1 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Box className="w-12 h-12 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">3D Viewer Coming Soon</h2>
              <p className="text-slate-600 max-w-md">
                The interactive 3D viewer will be extracted to a shared component using React Three Fiber
              </p>
              <div className="mt-4 text-sm text-slate-500">
                <code className="px-2 py-1 bg-white rounded">components/r3f/Viewer3D.tsx</code>
              </div>
            </div>
          </div>

          {/* Bottom Panel - Summary */}
          <div className="bg-white border-t border-slate-200 p-4">
            <KPIDock items={kpiItems} title="Configuration Summary" />
          </div>
        </main>

        {/* Right Panel - BOM & Specs */}
        <aside className="w-80 bg-white border-l border-slate-200 flex-shrink-0 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Bill of Materials</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Configurator Engine Required</p>
                  <p className="text-blue-700">
                    BOM calculations will use the <code className="text-xs bg-blue-100 px-1 rounded">@caribbean-azure/configurator-engine</code> package
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Wall Framing</span>
                <span className="font-medium">-- pcs</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Roof Trusses</span>
                <span className="font-medium">-- pcs</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Siding Panels</span>
                <span className="font-medium">-- m²</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Roofing Material</span>
                <span className="font-medium">-- m²</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Fasteners</span>
                <span className="font-medium">-- kg</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
