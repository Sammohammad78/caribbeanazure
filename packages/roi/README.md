# @caribbean-azure/roi

Universal ROI (Return on Investment) Calculator package for Caribbean Azure. A standalone React component for calculating cost savings with real-time updates, Dutch/English locale support, and CSV export functionality.

## Features

- **Real-time Calculations**: Updates results as users adjust inputs
- **Dutch Number Formatting**: Supports Dutch locale (€12.500,00) and English (€12,500.00)
- **CSV Export**: Export calculation results to CSV file
- **URL Parameter Persistence**: Optional URL sync for sharing calculations
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Presets**: Built-in presets for different solution tiers (Light, Manufacturing, C2P)
- **Responsive Design**: Mobile-friendly with adaptive layouts
- **Analytics Ready**: Optional analytics callback for tracking user interactions
- **Accessible**: ARIA labels and semantic HTML

## Installation

```bash
npm install @caribbean-azure/roi
# or
yarn add @caribbean-azure/roi
# or
pnpm add @caribbean-azure/roi
```

## Usage

### Basic Usage

```tsx
import { RoiCalculator } from '@caribbean-azure/roi'

function App() {
  return (
    <RoiCalculator
      locale="nl"
      variant="card"
      showExport={true}
      onSubmit={(inputs, result) => {
        console.log('Annual savings:', result.annualSavings)
      }}
    />
  )
}
```

### With Custom Initial Values

```tsx
import { RoiCalculator } from '@caribbean-azure/roi'

function App() {
  return (
    <RoiCalculator
      locale="nl"
      initialInputs={{
        teamSize: 10,
        hourlyRate: 75,
        hoursSavedPerWeek: 3,
        adoption: 0.8,
      }}
      showMethodNote={true}
    />
  )
}
```

### Using Presets

```tsx
import { RoiCalculator } from '@caribbean-azure/roi'

function App() {
  return (
    <RoiCalculator
      locale="nl"
      preset="manufacturing"  // or 'light', 'c2p', 'custom'
      variant="inline"
    />
  )
}
```

### With Analytics Tracking

```tsx
import { RoiCalculator } from '@caribbean-azure/roi'

function App() {
  const handleAnalytics = (event: string, props: Record<string, any>) => {
    // Send to your analytics service (e.g., Plausible, GA4)
    console.log('Analytics:', event, props)
  }

  return (
    <RoiCalculator
      locale="en"
      onAnalytics={handleAnalytics}
      onSubmit={(inputs, result) => {
        // Handle form submission
        console.log('Submitted:', result)
      }}
    />
  )
}
```

### Using the Summary Component Separately

```tsx
import { RoiSummary, calculateRoi } from '@caribbean-azure/roi'

function App() {
  const result = calculateRoi({
    teamSize: 5,
    hourlyRate: 65,
    hoursSavedPerWeek: 2,
    adoption: 0.7,
  })

  return (
    <RoiSummary
      result={result}
      locale="nl"
      highlightAnnual={true}
    />
  )
}
```

## API Reference

### RoiCalculator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `'nl' \| 'en'` | `'nl'` | Locale for translations and number formatting |
| `variant` | `'inline' \| 'card' \| 'page'` | `'card'` | Display variant |
| `preset` | `'light' \| 'manufacturing' \| 'c2p' \| 'custom'` | `'custom'` | Preset configuration |
| `initialInputs` | `Partial<RoiInputs>` | - | Initial values for inputs |
| `showMethodNote` | `boolean` | `false` | Show calculation methodology note |
| `showExport` | `boolean` | `true` | Show CSV export button |
| `enableUrlSync` | `boolean` | `false` | Enable URL parameter sync |
| `ctaLabel` | `string` | - | Custom CTA button label |
| `onSubmit` | `(inputs, result) => void \| Promise<void>` | - | Callback when user submits |
| `onAnalytics` | `(event, props) => void` | - | Analytics callback |
| `translations` | `object` | - | Custom translations (merges with defaults) |

### RoiSummary Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `result` | `RoiResult` | **required** | Calculated ROI results |
| `locale` | `'nl' \| 'en'` | `'nl'` | Locale for number formatting |
| `labels` | `object` | - | Custom labels for metrics |
| `highlightAnnual` | `boolean` | `true` | Highlight annual savings |
| `className` | `string` | `''` | Additional CSS classes |

### Types

#### RoiInputs

```typescript
interface RoiInputs {
  teamSize: number          // 1-1000
  hourlyRate: number        // €10-500
  hoursSavedPerWeek: number // 0.5-40
  adoption: number          // 0.1-1 (10%-100%)
}
```

#### RoiResult

```typescript
interface RoiResult {
  weeklySavings: number
  monthlySavings: number
  annualSavings: number
  hoursSavedAnnually: number
}
```

## Utility Functions

### calculateRoi

Calculate ROI metrics from inputs.

```typescript
import { calculateRoi } from '@caribbean-azure/roi'

const result = calculateRoi({
  teamSize: 5,
  hourlyRate: 65,
  hoursSavedPerWeek: 2,
  adoption: 0.7,
})

console.log(result.annualSavings) // €23,660
```

**Formula**: `teamSize × hourlyRate × hoursSavedPerWeek × 52 × adoption`

### formatCurrency

Format numbers as EUR currency with locale support.

```typescript
import { formatCurrency } from '@caribbean-azure/roi'

formatCurrency(12500, 'nl')  // "€12.500"
formatCurrency(12500, 'en')  // "€12,500"
```

### formatNumber

Format numbers with locale-aware thousands separator.

```typescript
import { formatNumber } from '@caribbean-azure/roi'

formatNumber(1234567, 'nl')  // "1.234.567"
formatNumber(1234567, 'en')  // "1,234,567"
```

### exportToCsv

Export calculation results to CSV file.

```typescript
import { exportToCsv } from '@caribbean-azure/roi'

exportToCsv(inputs, result, 'nl')
// Downloads: roi-calculator-2025-11-16.csv
```

### validateInputs

Validate ROI inputs against constraints.

```typescript
import { validateInputs } from '@caribbean-azure/roi'

const error = validateInputs({ teamSize: 0 })
// Returns: 'validation.teamSize'
```

## Calculation Methodology

The ROI calculator uses a conservative formula based on industry standards:

**Annual Savings** = Team Size × Hourly Rate × Hours Saved Per Week × 52 weeks × Adoption Rate

**Monthly Savings** = Annual Savings ÷ 12

**Hours Saved Annually** = Team Size × Hours Saved Per Week × 52 weeks × Adoption Rate

### Input Constraints

- **Team Size**: 1-1000 people
- **Hourly Rate**: €10-500
- **Hours Saved Per Week**: 0.5-40 hours
- **Adoption Rate**: 10%-100%

### Presets

| Preset | Team Size | Hourly Rate | Hours/Week | Adoption |
|--------|-----------|-------------|------------|----------|
| **Light** | 3 | €50 | 1.5 | 80% |
| **Manufacturing** | 8 | €75 | 4 | 70% |
| **C2P** | 12 | €85 | 6 | 65% |

## Styling

The components use Tailwind CSS classes for styling. Make sure Tailwind CSS is configured in your project:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@caribbean-azure/roi/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
}
```

For custom styling, you can override the default classes or wrap components in your own styled containers.

## Analytics Events

When `onAnalytics` callback is provided, the following events are tracked:

- `roi_open`: Calculator opened/mounted
- `roi_adjust`: Input value changed
- `roi_submit`: Submit button clicked
- `calc_export`: CSV export triggered

Example event data:

```javascript
{
  event: 'roi_submit',
  props: {
    annualSavings: 23660,
    variant: 'card',
    preset: 'custom',
    locale: 'nl'
  }
}
```

## Privacy

All calculations happen locally in the browser. No data is sent to external servers unless you implement it in the `onSubmit` callback.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and questions, please open an issue on the GitHub repository.
