import type { AutomationPlaybook } from '@caribbean-azure/types';

/**
 * Automation Playbook: Smart Lead Routing
 * Route leads to the right team member based on criteria
 */
export const leadRoutingPlaybook: AutomationPlaybook = {
  id: 'lead-routing',
  name: 'Smart Lead Routing',
  description: 'Intelligently route incoming leads to the right team member based on criteria like industry, company size, or region. Includes automatic Slack notifications.',
  category: 'integration',
  estimatedTimeSaved: 6, // hours per month
  difficulty: 'medium',
  template: {
    name: 'Smart Lead Routing',
    description: 'Route leads to the right team member',
    category: 'integration',
    status: 'draft',
    trigger: {
      type: 'webhook',
      config: {
        endpoint: '/webhooks/new-lead',
        method: 'POST',
        authentication: 'api_key',
      },
    },
    actions: [
      {
        id: 'enrich-lead',
        type: 'http_request',
        config: {
          method: 'GET',
          url: 'https://api.clearbit.com/v2/companies/find',
          params: {
            domain: '{{lead.company_domain}}',
          },
          headers: {
            'Authorization': 'Bearer {{CLEARBIT_API_KEY}}',
          },
        },
        order: 1,
      },
      {
        id: 'score-lead',
        type: 'custom',
        config: {
          action: 'calculate_lead_score',
          criteria: {
            companySize: 'weight:3',
            industry: 'weight:2',
            budget: 'weight:5',
            timeline: 'weight:4',
          },
        },
        order: 2,
      },
      {
        id: 'assign-owner',
        type: 'custom',
        config: {
          action: 'assign_lead_owner',
          rules: [
            {
              condition: 'lead.score >= 80',
              assign_to: 'senior_sales_rep',
            },
            {
              condition: 'lead.industry == "manufacturing"',
              assign_to: 'industry_specialist',
            },
            {
              condition: 'lead.company_size >= 100',
              assign_to: 'enterprise_team',
            },
          ],
          default_assignee: 'sales_pool',
        },
        order: 3,
      },
      {
        id: 'create-crm-record',
        type: 'update_crm',
        config: {
          platform: 'hubspot',
          action: 'create_contact',
          properties: {
            email: '{{lead.email}}',
            company: '{{lead.company}}',
            lead_score: '{{lead.score}}',
            owner: '{{assigned_owner.email}}',
          },
        },
        order: 4,
      },
      {
        id: 'notify-owner',
        type: 'notify_slack',
        config: {
          user: '{{assigned_owner.slack_id}}',
          message: '🔥 New high-quality lead assigned to you!\n\n*{{lead.name}}* from *{{lead.company}}*\nScore: {{lead.score}}/100\n\nView in CRM: {{crm.contact_url}}',
        },
        order: 5,
      },
      {
        id: 'send-welcome-email',
        type: 'send_email',
        config: {
          to: '{{lead.email}}',
          from: '{{assigned_owner.email}}',
          subject: 'Thanks for your interest in Caribbean Azure',
          template: 'lead-welcome',
          delay: '5 minutes',
        },
        order: 6,
      },
    ],
    config: {
      retryOnFailure: true,
      maxRetries: 3,
      notifyOnError: true,
    },
  },
};
