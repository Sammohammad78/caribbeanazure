'use client'

/**
 * Veranda Configurator Page
 *
 * 3D configurator for aluminum veranda designs
 * TODO: Integrate with @caribbean-azure/configurator-engine for calculations
 * TODO: Extract shared R3F viewer to components/r3f/Viewer3D.tsx
 */

import { useState } from 'react'
import { Home, Download, RotateCcw, AlertTriangle } from 'lucide-react'
import { ExportButton } from '@/components/shared/ExportButton'
import { KPIDock } from '@/components/shared/KPIDock'

// TODO: Import from @caribbean-azure/configurator-engine/veranda
// import { VerandaConfiguration, calculateVerandaBOM, validateVerandaConfig } from '@caribbean-azure/configurator-engine/veranda'

interface VerandaConfig {
  width: number
  projection: number
  height: number
  wallMount: 'bracket' | 'ledger'
  roofMaterial: 'polycarbonate' | 'steel' | 'glass'
  glazing: 'none' | 'fixed' | 'sliding'
  glazingSide: 'left' | 'right' | 'both' | 'front'
  heaters: boolean
  motorizedAwning: boolean
  ledLighting: boolean
  color: string
}

const DEFAULT_CONFIG: VerandaConfig = {
  width: 5,
  projection: 3.5,
  height: 2.8,
  wallMount: 'ledger',
  roofMaterial: 'polycarbonate',
  glazing: 'sliding',
  glazingSide: 'left',
  heaters: false,
  motorizedAwning: false,
  ledLighting: true,
  color: 'RAL 9005',
}

export default function VerandaConfiguratorPage() {
  const [config, setConfig] = useState<VerandaConfig>(DEFAULT_CONFIG)

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG)
  }

  // TODO: Replace with actual calculations from configurator engine
  const coverageArea = config.width * config.projection
  const glazingArea = config.glazing !== 'none' ? config.height *
    (config.glazingSide === 'both' ? config.width * 2 : config.width) : 0

  const kpiItems = [
    { label: 'Coverage Area', value: coverageArea.toFixed(1), unit: 'm²' },
    { label: 'Projection', value: config.projection.toFixed(1), unit: 'm' },
    { label: 'Height', value: config.height.toFixed(1), unit: 'm' },
    { label: 'Glazing Area', value: glazingArea.toFixed(1), unit: 'm²' },
    { label: 'Mount Type', value: config.wallMount, unit: '' },
  ]

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warm-100 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-warm-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Veranda Configurator</h1>
              <p className="text-sm text-slate-600">Design your custom aluminum veranda in 3D</p>
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
            <ExportButton data={config} filename="veranda-config" format="json" />
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
                    min="3"
                    max="10"
                    step="0.5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-warm-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Projection (m)
                  </label>
                  <input
                    type="number"
                    value={config.projection}
                    onChange={(e) => setConfig({ ...config, projection: parseFloat(e.target.value) || 0 })}
                    min="2.5"
                    max="5"
                    step="0.5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-warm-500"
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
                    min="2.2"
                    max="3.5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-warm-500"
                  />
                </div>
              </div>
            </div>

            {/* Structure */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Structure</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Wall Mounting
                  </label>
                  <select
                    value={config.wallMount}
                    onChange={(e) => setConfig({ ...config, wallMount: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-warm-500"
                  >
                    <option value="bracket">Bracket Mount</option>
                    <option value="ledger">Ledger Board</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Roof Material
                  </label>
                  <select
                    value={config.roofMaterial}
                    onChange={(e) => setConfig({ ...config, roofMaterial: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-warm-500"
                  >
                    <option value="polycarbonate">Polycarbonate</option>
                    <option value="steel">Steel Panels</option>
                    <option value="glass">Tempered Glass</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Color (RAL)
                  </label>
                  <select
                    value={config.color}
                    onChange={(e) => setConfig({ ...config, color: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-warm-500"
                  >
                    <option value="RAL 9005">RAL 9005 - Jet Black</option>
                    <option value="RAL 7016">RAL 7016 - Anthracite Grey</option>
                    <option value="RAL 9010">RAL 9010 - Pure White</option>
                    <option value="RAL 1015">RAL 1015 - Light Ivory</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Glazing */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Glazing</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Type
                  </label>
                  <select
                    value={config.glazing}
                    onChange={(e) => setConfig({ ...config, glazing: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-warm-500"
                  >
                    <option value="none">No Glazing</option>
                    <option value="fixed">Fixed Glass</option>
                    <option value="sliding">Sliding Glass</option>
                  </select>
                </div>
                {config.glazing !== 'none' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Side
                    </label>
                    <select
                      value={config.glazingSide}
                      onChange={(e) => setConfig({ ...config, glazingSide: e.target.value as any })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-warm-500 focus:border-warm-500"
                    >
                      <option value="left">Left Side</option>
                      <option value="right">Right Side</option>
                      <option value="both">Both Sides</option>
                      <option value="front">Front</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Options</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.ledLighting}
                    onChange={(e) => setConfig({ ...config, ledLighting: e.target.checked })}
                    className="w-4 h-4 text-warm-600 rounded focus:ring-warm-500"
                  />
                  <span className="text-sm text-slate-700">LED Lighting</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.heaters}
                    onChange={(e) => setConfig({ ...config, heaters: e.target.checked })}
                    className="w-4 h-4 text-warm-600 rounded focus:ring-warm-500"
                  />
                  <span className="text-sm text-slate-700">Infrared Heaters</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.motorizedAwning}
                    onChange={(e) => setConfig({ ...config, motorizedAwning: e.target.checked })}
                    className="w-4 h-4 text-warm-600 rounded focus:ring-warm-500"
                  />
                  <span className="text-sm text-slate-700">Motorized Sun Awning</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Viewer Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 bg-gradient-to-br from-warm-50 to-slate-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Home className="w-12 h-12 text-warm-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">3D Viewer Coming Soon</h2>
              <p className="text-slate-600 max-w-md">
                Veranda visualization will use the shared R3F viewer component
              </p>
              <div className="mt-4 text-sm text-slate-500">
                <code className="px-2 py-1 bg-white rounded">components/r3f/Viewer3D.tsx</code>
              </div>
            </div>
          </div>

          <div className="bg-white border-t border-slate-200 p-4">
            <KPIDock items={kpiItems} title="Veranda Summary" />
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
                    Veranda BOM from <code className="text-xs bg-blue-100 px-1 rounded">@caribbean-azure/configurator-engine/veranda</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Aluminum Profiles</span>
                <span className="font-medium">-- m</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Roof Panels</span>
                <span className="font-medium">-- m²</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Support Posts</span>
                <span className="font-medium">-- pcs</span>
              </div>
              {config.glazing !== 'none' && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Glass Panels</span>
                  <span className="font-medium">{glazingArea.toFixed(1)} m²</span>
                </div>
              )}
              {config.ledLighting && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">LED Strips</span>
                  <span className="font-medium">-- m</span>
                </div>
              )}
              {config.heaters && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">IR Heaters</span>
                  <span className="font-medium">2 pcs</span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
