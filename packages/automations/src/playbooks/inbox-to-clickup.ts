import type { AutomationPlaybook } from '@caribbean-azure/types';

/**
 * Automation Playbook: Inbox to ClickUp
 * Automatically create ClickUp tasks from incoming emails
 */
export const inboxToClickUpPlaybook: AutomationPlaybook = {
  id: 'inbox-to-clickup',
  name: 'Inbox to ClickUp Task',
  description: 'Automatically create ClickUp tasks from emails sent to a specific address. Perfect for support requests, feature ideas, or general inquiries.',
  category: 'inbox',
  estimatedTimeSaved: 8, // hours per month
  difficulty: 'easy',
  template: {
    name: 'Inbox to ClickUp Task',
    description: 'Convert emails to ClickUp tasks automatically',
    category: 'inbox',
    status: 'draft',
    trigger: {
      type: 'email',
      config: {
        emailAddress: 'support@yourcompany.com',
        filterRules: {
          requireKeyword: false,
          excludeSpam: true,
        },
      },
    },
    actions: [
      {
        id: 'parse-email',
        type: 'custom',
        config: {
          action: 'parse_email_content',
          extractFields: ['sender', 'subject', 'body', 'attachments'],
        },
        order: 1,
      },
      {
        id: 'create-task',
        type: 'http_request',
        config: {
          method: 'POST',
          url: 'https://api.clickup.com/api/v2/list/{list_id}/task',
          headers: {
            'Authorization': '{{CLICKUP_API_KEY}}',
            'Content-Type': 'application/json',
          },
          body: {
            name: '{{email.subject}}',
            description: `From: {{email.sender}}\n\n{{email.body}}`,
            status: 'to do',
            priority: 3,
            tags: ['from-email'],
          },
        },
        order: 2,
      },
      {
        id: 'send-confirmation',
        type: 'send_email',
        config: {
          to: '{{email.sender}}',
          subject: 'We received your message',
          template: 'email-received-confirmation',
          variables: {
            taskUrl: '{{clickup.task_url}}',
          },
        },
        order: 3,
      },
    ],
    config: {
      retryOnFailure: true,
      maxRetries: 3,
      notifyOnError: true,
    },
  },
};
