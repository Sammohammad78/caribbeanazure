# @caribbean-azure/utils

Shared utility functions for the Caribbean Azure platform.

## Installation

```bash
pnpm add @caribbean-azure/utils
```

## Usage

### Class Names (`cn`)

Intelligently merges Tailwind CSS classes:

```typescript
import { cn } from '@caribbean-azure/utils';

<div className={cn(
  'px-4 py-2 bg-blue-500',
  isActive && 'bg-blue-700',
  className
)} />
```

### Formatting

```typescript
import { formatNumber, formatCurrency, formatDate } from '@caribbean-azure/utils';

formatNumber(1234.56, 2); // "1.234,56"
formatCurrency(1234.56);  // "€ 1.234,56"
formatDate(new Date());    // "16 nov. 2025"
```

### Validation

```typescript
import { isValidEmail, isValidDutchPhone } from '@caribbean-azure/utils';

isValidEmail('test@example.com');    // true
isValidDutchPhone('+31 6 12345678'); // true
```

## License

Private - Caribbean Azure Monorepo
