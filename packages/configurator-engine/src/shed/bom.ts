/**
 * Shed Bill of Materials (BOM) Calculation
 * Calculate material quantities needed for construction
 */

import { ShedConfiguration, QuantityResults } from './types'
import { calculateQuantities } from './calculations'

export interface BOMItem {
  id: string
  category: 'foundation' | 'framing' | 'cladding' | 'roofing' | 'opening' | 'floor' | 'hardware'
  name: string
  description: string
  quantity: number
  unit: 'pcs' | 'm' | 'm²' | 'm³' | 'set'
  dimensions?: string
}

export interface BOM {
  items: BOMItem[]
  totalItems: number
  estimatedWeight?: number // kg
  notes?: string[]
}

/**
 * Calculate Bill of Materials for a shed configuration
 */
export function calculateShedBOM(config: ShedConfiguration): BOM {
  const quantities = calculateQuantities(config)
  const items: BOMItem[] = []

  // 1. FOUNDATION
  const foundationVolume = quantities.totalFloorArea * 0.15 // 15cm depth
  items.push({
    id: 'FOUND-001',
    category: 'foundation',
    name: 'Betonnen fundering',
    description: `Fundering 15cm diep voor ${quantities.totalFloorArea}m² oppervlak`,
    quantity: Math.round(foundationVolume * 100) / 100,
    unit: 'm³',
  })

  items.push({
    id: 'FOUND-002',
    category: 'foundation',
    name: 'Grindbed',
    description: 'Grindlaag onder fundering, 10cm diep',
    quantity: Math.round(quantities.totalFloorArea * 0.1 * 100) / 100,
    unit: 'm³',
  })

  // 2. FRAMING (Corner posts and wall studs)
  const cornerPosts = 4
  items.push({
    id: 'FRAM-001',
    category: 'framing',
    name: 'Hoekpalen',
    description: `Houten palen 90x90mm, L=${config.wallHeight}m`,
    quantity: cornerPosts,
    unit: 'pcs',
    dimensions: `90x90mm, L=${config.wallHeight}m`,
  })

  const perimeterLength = quantities.perimeter
  const studSpacing = 0.6 // studs every 60cm
  const wallStuds = Math.ceil(perimeterLength / studSpacing)
  items.push({
    id: 'FRAM-002',
    category: 'framing',
    name: 'Wandstijlen',
    description: `Wandstijlen 45x90mm, L=${config.wallHeight}m, afstand 60cm`,
    quantity: wallStuds,
    unit: 'pcs',
    dimensions: `45x90mm, L=${config.wallHeight}m`,
  })

  // 3. ROOF FRAMING
  const rafterCount = Math.ceil(config.width / 0.6) // rafters every 60cm
  const rafterLength = config.roofType === 'gabled'
    ? Math.sqrt(Math.pow(config.width / 2, 2) + Math.pow(config.length * Math.tan((config.roofPitch * Math.PI) / 180), 2))
    : config.length * 1.1 // Add 10% for overhang

  items.push({
    id: 'FRAM-003',
    category: 'framing',
    name: 'Dakspanten',
    description: `Dakspanten 45x145mm voor ${config.roofType} dak`,
    quantity: rafterCount,
    unit: 'pcs',
    dimensions: `45x145mm, L=${Math.round(rafterLength * 10) / 10}m`,
  })

  // 4. WALL CLADDING
  items.push({
    id: 'CLAD-001',
    category: 'cladding',
    name: `Gevelbekleding ${config.wallMaterial}`,
    description: `${config.wallMaterial} panelen voor gevel`,
    quantity: quantities.materials.walls.area,
    unit: 'm²',
  })

  // 5. ROOFING
  items.push({
    id: 'ROOF-001',
    category: 'roofing',
    name: `Dakbedekking ${config.roofMaterial}`,
    description: `${config.roofMaterial} voor ${quantities.materials.roof.area}m²`,
    quantity: quantities.materials.roof.area,
    unit: 'm²',
  })

  if (config.roofType !== 'flat') {
    items.push({
      id: 'ROOF-002',
      category: 'roofing',
      name: 'Onderdak/dakbeschot',
      description: 'OSB platen 18mm voor dakbeschot',
      quantity: quantities.materials.roof.area,
      unit: 'm²',
    })
  }

  // 6. FLOOR
  if (config.showFloor) {
    items.push({
      id: 'FLOOR-001',
      category: 'floor',
      name: `Vloer ${config.floorMaterial}`,
      description: `${config.floorMaterial} vloer voor ${quantities.materials.floor.area}m²`,
      quantity: quantities.materials.floor.area,
      unit: 'm²',
    })

    if (config.floorMaterial === 'timber') {
      items.push({
        id: 'FLOOR-002',
        category: 'floor',
        name: 'Vloerbalken',
        description: 'Houten balken 45x145mm voor vloerconstructie',
        quantity: Math.ceil(config.width / 0.4), // joists every 40cm
        unit: 'pcs',
        dimensions: `45x145mm, L=${config.length}m`,
      })
    }
  }

  // 7. DOORS
  for (let i = 0; i < config.doorCount; i++) {
    items.push({
      id: `DOOR-${String(i + 1).padStart(3, '0')}`,
      category: 'opening',
      name: 'Deur',
      description: `Deur ${config.doorWidth}m x ${config.doorHeight}m inclusief kozijn`,
      quantity: 1,
      unit: 'set',
      dimensions: `${config.doorWidth}m x ${config.doorHeight}m`,
    })
  }

  // 8. WINDOWS
  for (let i = 0; i < config.windowCount; i++) {
    items.push({
      id: `WIN-${String(i + 1).padStart(3, '0')}`,
      category: 'opening',
      name: 'Raam',
      description: `Raam ${config.windowWidth}m x ${config.windowHeight}m inclusief kozijn`,
      quantity: 1,
      unit: 'set',
      dimensions: `${config.windowWidth}m x ${config.windowHeight}m`,
    })
  }

  // 9. HARDWARE
  items.push({
    id: 'HARD-001',
    category: 'hardware',
    name: 'Bevestigingsmaterialen',
    description: 'Schroeven, spijkers, hoekverbindingen, etc.',
    quantity: 1,
    unit: 'set',
  })

  items.push({
    id: 'HARD-002',
    category: 'hardware',
    name: 'Waterdichting',
    description: 'Kit, membraan, bitumenstroken',
    quantity: 1,
    unit: 'set',
  })

  const notes = [
    'Materialen zijn indicatief en kunnen variëren per leverancier',
    'Hoeveelheden bevatten geen verspilling - reken 10-15% extra',
    'Raadpleeg een vakman voor exacte materiaallijst',
    'Lokale bouwvoorschriften kunnen extra eisen stellen',
  ]

  return {
    items,
    totalItems: items.length,
    notes,
  }
}

/**
 * Export BOM as formatted text
 */
export function exportBOMText(bom: BOM): string {
  let output = 'MATERIAALLIJST (BOM)\n'
  output += '═'.repeat(60) + '\n\n'

  const categories = Array.from(new Set(bom.items.map((item) => item.category)))

  categories.forEach((category) => {
    output += `${category.toUpperCase()}\n`
    output += '─'.repeat(60) + '\n'

    const categoryItems = bom.items.filter((item) => item.category === category)
    categoryItems.forEach((item) => {
      output += `${item.id} - ${item.name}\n`
      output += `  ${item.description}\n`
      output += `  Hoeveelheid: ${item.quantity} ${item.unit}\n`
      if (item.dimensions) {
        output += `  Afmetingen: ${item.dimensions}\n`
      }
      output += '\n'
    })
  })

  if (bom.notes && bom.notes.length > 0) {
    output += '\nOPMERKINGEN\n'
    output += '─'.repeat(60) + '\n'
    bom.notes.forEach((note) => {
      output += `• ${note}\n`
    })
  }

  return output
}
