/**
 * Caribbean Azure Automations Package
 * Pre-built automation playbooks for common workflows
 */

export * from './playbooks/inbox-to-clickup';
export * from './playbooks/intake-to-quote';
export * from './playbooks/lead-routing';

import { inboxToClickUpPlaybook } from './playbooks/inbox-to-clickup';
import { intakeToQuotePlaybook } from './playbooks/intake-to-quote';
import { leadRoutingPlaybook } from './playbooks/lead-routing';
import type { AutomationPlaybook } from '@caribbean-azure/types';

/**
 * All available automation playbooks
 */
export const playbooks: AutomationPlaybook[] = [
  inboxToClickUpPlaybook,
  intakeToQuotePlaybook,
  leadRoutingPlaybook,
];

/**
 * Get playbook by ID
 */
export function getPlaybookById(id: string): AutomationPlaybook | undefined {
  return playbooks.find((p) => p.id === id);
}

/**
 * Get playbooks by category
 */
export function getPlaybooksByCategory(
  category: string
): AutomationPlaybook[] {
  return playbooks.filter((p) => p.category === category);
}

/**
 * Get playbooks by difficulty
 */
export function getPlaybooksByDifficulty(
  difficulty: 'easy' | 'medium' | 'advanced'
): AutomationPlaybook[] {
  return playbooks.filter((p) => p.difficulty === difficulty);
}

/**
 * Calculate total time saved by playbooks
 */
export function calculateTotalTimeSaved(
  playbookIds: string[]
): number {
  return playbookIds.reduce((total, id) => {
    const playbook = getPlaybookById(id);
    return total + (playbook?.estimatedTimeSaved || 0);
  }, 0);
}
