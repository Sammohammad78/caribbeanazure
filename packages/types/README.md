# @caribbean-azure/types

Shared TypeScript types and interfaces for the Caribbean Azure platform.

## Installation

```bash
pnpm add @caribbean-azure/types
```

## Usage

```typescript
import type { User, Organization, Lead, AutomationFlow } from '@caribbean-azure/types';

const user: User = {
  id: '123',
  email: 'john@example.com',
  role: 'admin',
  organizationId: 'org-456',
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

## Type Categories

- **Organization**: Tenant and organization types
- **User**: User accounts and preferences
- **Lead**: Customer inquiries and lead management
- **Automation**: Workflow automation types
- **Configurator**: Product configuration types
- **Quote**: Quotes and proposals

## License

Private - Caribbean Azure Monorepo
