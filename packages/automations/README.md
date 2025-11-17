# @caribbean-azure/automations

Pre-built automation playbooks for common business workflows.

## Installation

```bash
pnpm add @caribbean-azure/automations
```

## Usage

### Get All Playbooks

```typescript
import { playbooks } from '@caribbean-azure/automations';

console.log(`Available playbooks: ${playbooks.length}`);
```

### Get Specific Playbook

```typescript
import { getPlaybookById } from '@caribbean-azure/automations';

const playbook = getPlaybookById('inbox-to-clickup');
console.log(playbook.name); // "Inbox to ClickUp Task"
console.log(playbook.estimatedTimeSaved); // 8 hours/month
```

### Filter by Category

```typescript
import { getPlaybooksByCategory } from '@caribbean-azure/automations';

const inboxPlaybooks = getPlaybooksByCategory('inbox');
const integrationPlaybooks = getPlaybooksByCategory('integration');
```

### Filter by Difficulty

```typescript
import { getPlaybooksByDifficulty } from '@caribbean-azure/automations';

const easyPlaybooks = getPlaybooksByDifficulty('easy');
const advancedPlaybooks = getPlaybooksByDifficulty('advanced');
```

### Calculate Time Saved

```typescript
import { calculateTotalTimeSaved } from '@caribbean-azure/automations';

const activePlaybookIds = ['inbox-to-clickup', 'lead-routing'];
const totalHoursSaved = calculateTotalTimeSaved(activePlaybookIds);
console.log(`Total time saved: ${totalHoursSaved} hours/month`);
```

## Available Playbooks

### 1. Inbox to ClickUp Task
**Category**: Inbox
**Difficulty**: Easy
**Time Saved**: 8 hours/month

Automatically create ClickUp tasks from emails sent to a specific address.

### 2. Intake Form to Quote PDF
**Category**: Data
**Difficulty**: Medium
**Time Saved**: 12 hours/month

Generate and send professional quote PDFs when customers submit intake forms.

### 3. Smart Lead Routing
**Category**: Integration
**Difficulty**: Medium
**Time Saved**: 6 hours/month

Intelligently route incoming leads to the right team member based on criteria.

## Creating Custom Playbooks

You can create custom playbooks following the `AutomationPlaybook` interface:

```typescript
import type { AutomationPlaybook } from '@caribbean-azure/types';

const customPlaybook: AutomationPlaybook = {
  id: 'my-custom-automation',
  name: 'My Custom Automation',
  description: 'Description of what it does',
  category: 'custom',
  estimatedTimeSaved: 5,
  difficulty: 'easy',
  template: {
    name: 'My Custom Automation',
    description: 'Template description',
    category: 'custom',
    status: 'draft',
    trigger: {
      type: 'webhook',
      config: { /* trigger config */ },
    },
    actions: [
      // Array of automation actions
    ],
    config: {
      retryOnFailure: true,
      maxRetries: 3,
    },
  },
};
```

## License

Private - Caribbean Azure Monorepo
