/**
 * Automation workflow types
 */

export interface AutomationFlow {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  category: 'inbox' | 'data' | 'integration' | 'notification' | 'custom';
  status: 'active' | 'paused' | 'draft';
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  config: Record<string, any>;
  stats: {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    avgExecutionTime: number;
    lastRunAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AutomationTrigger {
  type: 'webhook' | 'schedule' | 'email' | 'form_submission' | 'manual';
  config: Record<string, any>;
}

export interface AutomationAction {
  id: string;
  type: 'send_email' | 'create_task' | 'update_crm' | 'notify_slack' | 'http_request' | 'custom';
  config: Record<string, any>;
  order: number;
}

export interface AutomationPlaybook {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedTimeSaved: number; // hours per month
  difficulty: 'easy' | 'medium' | 'advanced';
  template: Omit<AutomationFlow, 'id' | 'organizationId' | 'createdAt' | 'updatedAt' | 'stats'>;
}

export type AutomationCategory = AutomationFlow['category'];
export type AutomationStatus = AutomationFlow['status'];
