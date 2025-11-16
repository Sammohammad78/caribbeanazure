# Configurator Engine

Unified configurator logic for sheds, carports, and verandas. This package provides comprehensive calculation, validation, BOM generation, and pricing functionality for all product types.

## Features

- **Shed Configurator**: Complete logic for shed/tuinhuis/berging/atelier/schuur configurations
- **Carport Configurator**: Aluminum carport configuration with structural calculations
- **Veranda Configurator**: Aluminum veranda/terrace configuration with glass options
- **Shared Utilities**: Reusable validation engine, pricing utilities, and math helpers

## Installation

```bash
npm install @caribbean-azure/configurator-engine
```

## Usage

### Shed Configurator

```typescript
import {
  ShedConfiguration,
  calculateQuantities,
  validateConfig,
  calculateShedBOM,
  calculatePrice,
  PRESETS,
} from '@caribbean-azure/configurator-engine'

// Use a preset
const config = PRESETS[0].config // "Tuinberging Compact"

// Or create custom configuration
const customConfig: ShedConfiguration = {
  shedType: 'tuinhuis',
  width: 4.0,
  length: 5.0,
  wallHeight: 2.5,
  roofType: 'gabled',
  roofPitch: 30,
  // ... more properties
}

// Validate configuration
const errors = validateConfig(customConfig)
if (errors.length === 0) {
  console.log('Configuration is valid!')
}

// Calculate quantities
const quantities = calculateQuantities(customConfig)
console.log(`Floor area: ${quantities.totalFloorArea}m²`)
console.log(`Roof area: ${quantities.roofArea}m²`)
console.log(`Volume: ${quantities.totalVolume}m³`)

// Generate BOM
const bom = calculateShedBOM(customConfig)
console.log(`Total items: ${bom.totalItems}`)
bom.items.forEach((item) => {
  console.log(`${item.name}: ${item.quantity} ${item.unit}`)
})

// Calculate pricing
const price = calculatePrice(customConfig, { country: 'NL' })
console.log(`Total price: €${price.total}`)
console.log(`Price range: €${price.range.min} - €${price.range.max}`)
```

### Carport Configurator

```typescript
import {
  CarportConfiguration,
  calculateCarportDimensions,
  validateCarportConfiguration,
  calculateCarportBOM,
  calculateCarportPrice,
} from '@caribbean-azure/configurator-engine'

const carportConfig: CarportConfiguration = {
  productType: 'carport',
  width: 3.0,
  depth: 5.0,
  height: 2.3,
  roofType: 'mono-slope',
  roofPitch: 5,
  roofMaterial: 'polycarbonate',
  roofOverhang: 0.3,
  postCount: 4,
  postSize: 100,
  beamSize: 120,
  ralColor: 'RAL-7016',
  footing: 'concrete-bolted',
  gutters: 'aluminum-seamless',
  lighting: 'none',
  sidePanel: 'none',
  storageArea: false,
  totalArea: 15.0,
  coveredArea: 18.2,
}

// Validate
const validation = validateCarportConfiguration(carportConfig)
if (!validation.valid) {
  console.error('Validation errors:', validation.errors)
}

// Calculate dimensions
const dims = calculateCarportDimensions(carportConfig)
console.log(`Covered area: ${dims.coveredArea}m²`)
console.log(`Post count: ${dims.postCount}`)

// Generate BOM and pricing
const bom = calculateCarportBOM(carportConfig)
const price = calculateCarportPrice(carportConfig, { country: 'NL' })
```

### Veranda Configurator

```typescript
import {
  VerandaConfiguration,
  calculateVerandaDimensions,
  validateVerandaConfiguration,
  calculateVerandaBOM,
  calculateVerandaPrice,
} from '@caribbean-azure/configurator-engine'

const verandaConfig: VerandaConfiguration = {
  productType: 'veranda',
  width: 4.0,
  depth: 3.0,
  height: 2.5,
  roofType: 'mono-slope',
  roofPitch: 5,
  roofMaterial: 'glass',
  roofOverhang: 0.2,
  postCount: 2,
  postSize: 100,
  rafterSpacing: 500,
  ralColor: 'RAL-9010',
  glassType: 'sliding-glass',
  glassSides: 'both',
  footing: 'concrete-bolted',
  gutters: 'aluminum-seamless',
  lighting: 'recessed-spots',
  heater: true,
  motorizedAwning: false,
  wallAttachment: 'ledger-board',
  totalArea: 12.0,
  glassArea: 15.6,
}

// Use the same pattern as carport
const dims = calculateVerandaDimensions(verandaConfig)
const bom = calculateVerandaBOM(verandaConfig)
const price = calculateVerandaPrice(verandaConfig, { country: 'NL' })
```

### Using the Rules Engine

```typescript
import { RulesEngine, Validators, rule } from '@caribbean-azure/configurator-engine'

interface ProductConfig {
  width: number
  height: number
  material: string
}

const engine = new RulesEngine<ProductConfig>()

// Add rules using fluent API
engine.addRule(
  rule<ProductConfig>('width')
    .validator(Validators.inRange(2.0, 10.0))
    .message('Width must be between 2.0m and 10.0m')
    .suggestion('Adjust width to be between 2.0m and 10.0m')
    .severity('error')
    .build()
)

engine.addRule(
  rule<ProductConfig>('height')
    .validator(Validators.greaterThan(2.0))
    .message('Height must be greater than 2.0m')
    .severity('error')
    .build()
)

const config = { width: 1.5, height: 2.5, material: 'timber' }
const result = engine.validate(config)

if (!result.valid) {
  console.error('Errors:', result.errors)
}
```

### Utility Functions

```typescript
import {
  round,
  clamp,
  formatArea,
  formatPrice,
  calculateVAT,
  getRegionalMultiplier,
} from '@caribbean-azure/configurator-engine'

// Math utilities
const rounded = round(3.14159, 2) // 3.14
const clamped = clamp(150, 0, 100) // 100

// Formatting
const area = formatArea(25.5) // "25.5 m²"
const price = formatPrice(1500) // "€ 1.500"

// Pricing utilities
const vat = calculateVAT(1000, 'NL') // 210 (21% VAT)
const multiplier = getRegionalMultiplier('NL', 'Noord-Holland') // 1.15
```

## Package Structure

```
src/
├── shed/               # Shed configurator
│   ├── types.ts        # ShedConfiguration interface and types
│   ├── calculations.ts # Surface area, volume, quantity calculations
│   ├── validation.ts   # Dimension validation, rules engine
│   ├── bom.ts          # Bill of materials calculation
│   ├── pricing.ts      # Pricing calculation logic
│   ├── presets.ts      # Common shed presets
│   └── __tests__/      # Unit tests
├── carport/            # Carport configurator
│   ├── types.ts
│   ├── calculations.ts # Post count, surface areas
│   ├── validation.ts   # Structural validation
│   ├── bom.ts
│   └── pricing.ts
├── veranda/            # Veranda configurator
│   ├── types.ts
│   ├── calculations.ts # Glass area, joist spacing
│   ├── validation.ts   # Attachment validation
│   ├── bom.ts
│   └── pricing.ts
├── shared/             # Shared utilities
│   ├── rules-engine.ts # Generic validation engine
│   ├── pricing-base.ts # Base pricing utilities
│   └── utils.ts        # Math utilities, formatting
└── index.ts            # Main exports
```

## API Reference

### Shed API

- **Types**: `ShedConfiguration`, `ShedType`, `RoofType`, `WallMaterial`, etc.
- **Calculations**: `calculateQuantities()`, `calculateRoofArea()`, `calculatePerimeter()`
- **Validation**: `validateConfig()`, `isValidConfig()`, `getValidationWarnings()`
- **BOM**: `calculateShedBOM()`, `exportBOMText()`
- **Pricing**: `calculatePrice()`, `formatPrice()`
- **Presets**: `PRESETS`, `getPresetByName()`, `getPresetsByShedType()`

### Carport API

- **Types**: `CarportConfiguration`, `RoofMaterial`, `RALColor`, etc.
- **Calculations**: `calculateCarportDimensions()`, `calculatePostCount()`, `calculateRoofArea()`
- **Validation**: `validateCarportConfiguration()`, `isValidCarportConfig()`
- **BOM**: `calculateCarportBOM()`
- **Pricing**: `calculateCarportPrice()`

### Veranda API

- **Types**: `VerandaConfiguration`, `GlassType`, etc.
- **Calculations**: `calculateVerandaDimensions()`, `calculateGlassArea()`
- **Validation**: `validateVerandaConfiguration()`, `isValidVerandaConfig()`
- **BOM**: `calculateVerandaBOM()`
- **Pricing**: `calculateVerandaPrice()`

### Shared Utilities

- **Rules Engine**: `RulesEngine`, `Validators`, `rule()`
- **Pricing**: `calculateVAT()`, `getRegionalMultiplier()`, `formatPrice()`
- **Math**: `round()`, `clamp()`, `degreesToRadians()`, `slopedLength()`
- **Formatting**: `formatArea()`, `formatVolume()`, `formatLength()`

## Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Type Checking

```bash
npm run typecheck
```

## License

MIT

## Author

Caribbean Azure
