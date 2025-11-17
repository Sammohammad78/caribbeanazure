/**
 * Carport Bill of Materials (BOM) Calculation
 * Calculates all required materials for a carport configuration
 */

import { CarportConfiguration } from './types'

export interface BOMItem {
  id: string
  category: 'profile' | 'panel' | 'fixing' | 'accessory'
  name: string
  description: string
  sku?: string
  quantity: number
  unit: 'pcs' | 'm' | 'm²' | 'set'
  unitPrice?: number
  totalPrice?: number
  dimensions?: string
}

export interface BOM {
  productType: 'carport'
  items: BOMItem[]
  totalItems: number
  totalWeight?: number // kg
  estimatedPrice?: number
  currency?: string
  notes?: string[]
}

/**
 * Calculate carport BOM
 */
export function calculateCarportBOM(config: CarportConfiguration): BOM {
  const items: BOMItem[] = []

  // 1. POSTS (Vertical columns)
  const postLength = config.height + 0.5 // Add 0.5m for foundation
  items.push({
    id: 'POST-001',
    category: 'profile',
    name: 'Aluminium vierkante paal',
    description: `${config.postSize}x${config.postSize}mm, L=${postLength.toFixed(1)}m`,
    quantity: config.postCount,
    unit: 'pcs',
    dimensions: `${config.postSize}x${config.postSize}mm, L=${postLength.toFixed(1)}m`,
  })

  // 2. BEAMS (Horizontal support)
  const beamLengthWidth = config.width
  const beamLengthDepth = config.depth
  const beamCountWidth = Math.ceil(config.depth / 2.5)
  const beamCountDepth = Math.ceil(config.width / 2.5)

  items.push({
    id: 'BEAM-001',
    category: 'profile',
    name: 'Aluminium ligger',
    description: `${config.beamSize}x${config.beamSize}mm, L=${beamLengthWidth.toFixed(1)}m`,
    quantity: beamCountWidth,
    unit: 'pcs',
    dimensions: `${config.beamSize}x${config.beamSize}mm, L=${beamLengthWidth.toFixed(1)}m`,
  })

  items.push({
    id: 'BEAM-002',
    category: 'profile',
    name: 'Aluminium ligger',
    description: `${config.beamSize}x${config.beamSize}mm, L=${beamLengthDepth.toFixed(1)}m`,
    quantity: beamCountDepth,
    unit: 'pcs',
    dimensions: `${config.beamSize}x${config.beamSize}mm, L=${beamLengthDepth.toFixed(1)}m`,
  })

  // 3. ROOF PANELS
  const panelWidth = 1.05 // Standard panel width
  const panelLength = config.depth + config.roofOverhang * 2
  const panelCount = Math.ceil((config.width + config.roofOverhang * 2) / panelWidth)

  let roofMaterialName = 'Polycarbonaat dakpanelen'
  if (config.roofMaterial === 'steel-sheet') {
    roofMaterialName = 'Stalen dakplaten'
  } else if (config.roofMaterial === 'aluminum-panels') {
    roofMaterialName = 'Aluminium dakpanelen'
  } else if (config.roofMaterial === 'glass') {
    roofMaterialName = 'Gehard glas dakpanelen'
  }

  items.push({
    id: 'ROOF-001',
    category: 'panel',
    name: roofMaterialName,
    description: `L=${panelLength.toFixed(1)}m x B=1.05m`,
    quantity: panelCount,
    unit: 'pcs',
    dimensions: `L=${panelLength.toFixed(1)}m x B=1.05m`,
  })

  // 4. ROOF PURLINS (Support for roof panels)
  const purlinCount = Math.max(3, Math.ceil(config.depth / 0.8))
  items.push({
    id: 'PURLIN-001',
    category: 'profile',
    name: 'Aluminium gordingen',
    description: `60x40mm, L=${(config.width + config.roofOverhang * 2).toFixed(1)}m`,
    quantity: purlinCount,
    unit: 'pcs',
    dimensions: `60x40mm, L=${(config.width + config.roofOverhang * 2).toFixed(1)}m`,
  })

  // 5. FOUNDATION ANCHORS
  items.push({
    id: 'FOUND-001',
    category: 'fixing',
    name: 'Fundatie ankers',
    description: `Voor ${config.footing} montage`,
    quantity: config.postCount,
    unit: 'set',
  })

  // 6. GUTTERS (if selected)
  if (config.gutters !== 'none') {
    const gutterLength = config.width + config.roofOverhang * 2
    const gutterName =
      config.gutters === 'aluminum-seamless' ? 'Aluminium naadloze goot' : 'PVC dakgoot'

    items.push({
      id: 'GUTTER-001',
      category: 'accessory',
      name: gutterName,
      description: `Ø125mm, L=${gutterLength.toFixed(1)}m`,
      quantity: 1,
      unit: 'set',
      dimensions: `Ø125mm, L=${gutterLength.toFixed(1)}m`,
    })

    items.push({
      id: 'GUTTER-002',
      category: 'accessory',
      name: 'Hemelwaterafvoer',
      description: 'Ø80mm inclusief koppelstukken',
      quantity: 2,
      unit: 'pcs',
    })
  }

  // 7. LIGHTING (if selected)
  if (config.lighting !== 'none') {
    let lightingName = 'LED strip verlichting'
    let lightingQty = Math.ceil(config.width / 2)

    if (config.lighting === 'recessed-spots') {
      lightingName = 'Inbouw LED spots'
      lightingQty = Math.ceil((config.width * config.depth) / 4)
    } else if (config.lighting === 'pendant') {
      lightingName = 'Hangende LED verlichting'
      lightingQty = Math.max(2, Math.ceil(config.width / 3))
    }

    items.push({
      id: 'LIGHT-001',
      category: 'accessory',
      name: lightingName,
      description: 'Inclusief bedrading en dimmer',
      quantity: lightingQty,
      unit: 'pcs',
    })
  }

  // 8. SIDE PANELS (if selected)
  if (config.sidePanel && config.sidePanel !== 'none') {
    const panelHeight = config.height
    const panelLength = config.depth
    let panelCount = 0

    if (config.sidePanel === 'left' || config.sidePanel === 'right') {
      panelCount = Math.ceil(panelLength / 1.0)
    } else if (config.sidePanel === 'both') {
      panelCount = Math.ceil(panelLength / 1.0) * 2
    }

    items.push({
      id: 'PANEL-001',
      category: 'panel',
      name: 'Aluminium zijwandpanelen',
      description: `H=${panelHeight.toFixed(1)}m x B=1.0m`,
      quantity: panelCount,
      unit: 'pcs',
      dimensions: `H=${panelHeight.toFixed(1)}m x B=1.0m`,
    })
  }

  // 9. HARDWARE & FIXINGS
  items.push({
    id: 'HARD-001',
    category: 'fixing',
    name: 'Bevestigingsset',
    description: 'Bouten, moeren, schroeven, etc.',
    quantity: 1,
    unit: 'set',
  })

  const notes = [
    'Materialen zijn RAL ' + config.ralColor + ' gepoedercoat aluminium',
    'Montage op locatie door gecertificeerde monteurs aanbevolen',
    'Vergunningen kunnen nodig zijn - raadpleeg lokale gemeente',
    'Prijzen en levertijden kunnen variëren per leverancier',
  ]

  return {
    productType: 'carport',
    items,
    totalItems: items.length,
    notes,
  }
}
