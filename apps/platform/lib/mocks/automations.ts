/**
 * Mock Automation Playbook Data
 *
 * TODO: Integrate with real automation engine
 */

import { generateId } from '../utils'

export interface AutomationPlaybook {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'draft'
  trigger: string
  actions: AutomationAction[]
  activeContacts: number
  createdAt: string
  updatedAt: string
}

export interface AutomationAction {
  id: string
  type: 'email' | 'sms' | 'webhook' | 'delay' | 'condition'
  config: Record<string, any>
  order: number
}

// Mock playbooks
const playbooks: AutomationPlaybook[] = [
  {
    id: 'pb-001',
    name: 'Lead Follow-up Sequence',
    description: 'Automated follow-up emails for new leads',
    status: 'active',
    trigger: 'lead_created',
    actions: [
      {
        id: 'action-1',
        type: 'email',
        config: { template: 'welcome', delay: 0 },
        order: 1,
      },
      {
        id: 'action-2',
        type: 'delay',
        config: { hours: 24 },
        order: 2,
      },
      {
        id: 'action-3',
        type: 'email',
        config: { template: 'follow-up-1', delay: 0 },
        order: 3,
      },
    ],
    activeContacts: 45,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pb-002',
    name: 'Quote Reminder Campaign',
    description: 'Reminds leads about pending quotes',
    status: 'active',
    trigger: 'quote_sent',
    actions: [
      {
        id: 'action-1',
        type: 'delay',
        config: { hours: 72 },
        order: 1,
      },
      {
        id: 'action-2',
        type: 'email',
        config: { template: 'quote-reminder', delay: 0 },
        order: 2,
      },
    ],
    activeContacts: 28,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pb-003',
    name: 'Post-Sale Nurture',
    description: 'Customer satisfaction and upsell sequence',
    status: 'active',
    trigger: 'deal_won',
    actions: [
      {
        id: 'action-1',
        type: 'email',
        config: { template: 'thank-you', delay: 0 },
        order: 1,
      },
      {
        id: 'action-2',
        type: 'delay',
        config: { days: 30 },
        order: 2,
      },
      {
        id: 'action-3',
        type: 'email',
        config: { template: 'satisfaction-survey', delay: 0 },
        order: 3,
      },
    ],
    activeContacts: 12,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

/**
 * Get all automation playbooks
 */
export async function getPlaybooks(): Promise<AutomationPlaybook[]> {
  return [...playbooks]
}

/**
 * Get playbook by ID
 */
export async function getPlaybookById(id: string): Promise<AutomationPlaybook | null> {
  return playbooks.find((pb) => pb.id === id) || null
}

/**
 * Create new playbook
 */
export async function createPlaybook(
  data: Omit<AutomationPlaybook, 'id' | 'createdAt' | 'updatedAt' | 'activeContacts'>
): Promise<AutomationPlaybook> {
  const playbook: AutomationPlaybook = {
    ...data,
    id: `pb-${generateId()}`,
    activeContacts: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  playbooks.push(playbook)
  return playbook
}
