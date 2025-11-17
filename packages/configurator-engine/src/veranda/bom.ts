/**
 * Veranda Bill of Materials (BOM) Calculation
 */

import { VerandaConfiguration } from './types'
import { calculateVerandaDimensions } from './calculations'

export interface BOMItem {
  id: string
  category: 'profile' | 'panel' | 'fixing' | 'accessory'
  name: string
  description: string
  quantity: number
  unit: 'pcs' | 'm' | 'm²' | 'set'
  dimensions?: string
}

export interface BOM {
  productType: 'veranda'
  items: BOMItem[]
  totalItems: number
  notes?: string[]
}

/**
 * Calculate veranda BOM
 */
export function calculateVerandaBOM(config: VerandaConfiguration): BOM {
  const items: BOMItem[] = []
  const calcs = calculateVerandaDimensions(config)

  // 1. POSTS (Front edge only, attached to wall at back)
  const postLength = config.height + 0.5
  items.push({
    id: 'POST-001',
    category: 'profile',
    name: 'Aluminium paal',
    description: `${config.postSize}x${config.postSize}mm, L=${postLength.toFixed(1)}m`,
    quantity: calcs.postCount,
    unit: 'pcs',
    dimensions: `${config.postSize}x${config.postSize}mm, L=${postLength.toFixed(1)}m`,
  })

  // 2. WALL ATTACHMENT
  items.push({
    id: 'WALL-001',
    category: 'fixing',
    name: config.wallAttachment === 'ledger-board' ? 'Muurplaat' : 'Wandbeugels',
    description: `Voor wandmontage, L=${config.width}m`,
    quantity: config.wallAttachment === 'ledger-board' ? 1 : Math.ceil(config.width / 1.0),
    unit: config.wallAttachment === 'ledger-board' ? 'pcs' : 'set',
    dimensions: config.wallAttachment === 'ledger-board' ? `L=${config.width}m` : undefined,
  })

  // 3. RAFTERS/JOISTS
  const rafterLength = config.depth + config.roofOverhang
  items.push({
    id: 'RAFTER-001',
    category: 'profile',
    name: 'Aluminium spanten',
    description: `60x40mm, L=${rafterLength.toFixed(1)}m, afstand ${config.rafterSpacing}mm`,
    quantity: calcs.rafterCount,
    unit: 'pcs',
    dimensions: `60x40mm, L=${rafterLength.toFixed(1)}m`,
  })

  // 4. ROOF PANELS
  const panelWidth = 1.05
  const panelLength = rafterLength
  const panelCount = Math.ceil(config.width / panelWidth)

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

  // 5. FOUNDATION ANCHORS
  items.push({
    id: 'FOUND-001',
    category: 'fixing',
    name: 'Fundatie ankers',
    description: `Voor ${config.footing} montage`,
    quantity: calcs.postCount,
    unit: 'set',
  })

  // 6. GUTTERS (if selected)
  if (config.gutters !== 'none') {
    const gutterName =
      config.gutters === 'aluminum-seamless' ? 'Aluminium naadloze goot' : 'PVC dakgoot'

    items.push({
      id: 'GUTTER-001',
      category: 'accessory',
      name: gutterName,
      description: `Ø125mm, L=${config.width.toFixed(1)}m`,
      quantity: 1,
      unit: 'set',
      dimensions: `Ø125mm, L=${config.width.toFixed(1)}m`,
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

  // 8. GLASS PANELS (if selected)
  if (config.glassType && config.glassType !== 'none' && calcs.glassArea) {
    const glassName =
      config.glassType === 'sliding-glass'
        ? 'Schuifbare glazen wanden'
        : config.glassType === 'fixed-glass'
          ? 'Vaste beglazing'
          : 'Polycarbonaat panelen'

    items.push({
      id: 'GLASS-001',
      category: 'panel',
      name: glassName,
      description: `Totaal ${calcs.glassArea}m²`,
      quantity: Math.ceil(calcs.glassArea / 2), // Assuming 2m² panels
      unit: 'pcs',
      dimensions: `Per paneel ~2m²`,
    })
  }

  // 9. HEATER (if selected)
  if (config.heater) {
    items.push({
      id: 'HEAT-001',
      category: 'accessory',
      name: 'Infrarood terrasverwarmer',
      description: 'Elektrisch, wandmontage',
      quantity: Math.max(1, Math.ceil(config.width / 4)),
      unit: 'pcs',
    })
  }

  // 10. MOTORIZED AWNING (if selected)
  if (config.motorizedAwning) {
    items.push({
      id: 'AWNING-001',
      category: 'accessory',
      name: 'Elektrische zonwering',
      description: `Uitvalscherm, B=${config.width.toFixed(1)}m`,
      quantity: 1,
      unit: 'set',
      dimensions: `B=${config.width.toFixed(1)}m`,
    })
  }

  // 11. HARDWARE & FIXINGS
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
    'Wandbevestiging vereist draagkrachtige muur (baksteen/beton)',
    'Montage door gecertificeerde monteurs aanbevolen',
    'Bouwvergunning kan nodig zijn - raadpleeg lokale gemeente',
  ]

  return {
    productType: 'veranda',
    items,
    totalItems: items.length,
    notes,
  }
}
