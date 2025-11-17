import type { AutomationPlaybook } from '@caribbean-azure/types';

/**
 * Automation Playbook: Intake Form to Quote PDF
 * Generate professional quote PDFs from intake form submissions
 */
export const intakeToQuotePlaybook: AutomationPlaybook = {
  id: 'intake-to-quote',
  name: 'Intake Form to Quote PDF',
  description: 'Automatically generate and send professional quote PDFs when customers submit intake forms. Includes pricing calculations and company branding.',
  category: 'data',
  estimatedTimeSaved: 12, // hours per month
  difficulty: 'medium',
  template: {
    name: 'Intake Form to Quote PDF',
    description: 'Generate quotes from form submissions',
    category: 'data',
    status: 'draft',
    trigger: {
      type: 'form_submission',
      config: {
        formId: 'intake-form',
        source: 'website',
      },
    },
    actions: [
      {
        id: 'validate-data',
        type: 'custom',
        config: {
          action: 'validate_form_data',
          requiredFields: ['name', 'email', 'company', 'project_scope'],
        },
        order: 1,
      },
      {
        id: 'calculate-pricing',
        type: 'custom',
        config: {
          action: 'calculate_quote_pricing',
          pricingModel: 'tier-based',
          includeTax: true,
          taxRate: 0.21,
        },
        order: 2,
      },
      {
        id: 'generate-pdf',
        type: 'http_request',
        config: {
          method: 'POST',
          url: 'https://api.yourcompany.com/generate-quote-pdf',
          body: {
            customer: {
              name: '{{form.name}}',
              company: '{{form.company}}',
              email: '{{form.email}}',
            },
            items: '{{pricing.line_items}}',
            total: '{{pricing.total}}',
            validUntil: '{{date.add_days:30}}',
            template: 'quote-template-v2',
          },
        },
        order: 3,
      },
      {
        id: 'save-to-crm',
        type: 'update_crm',
        config: {
          platform: 'hubspot',
          action: 'create_deal',
          dealName: 'Quote: {{form.company}}',
          amount: '{{pricing.total}}',
          stage: 'quote_sent',
        },
        order: 4,
      },
      {
        id: 'send-quote-email',
        type: 'send_email',
        config: {
          to: '{{form.email}}',
          subject: 'Your quote from Caribbean Azure',
          template: 'quote-email',
          attachments: [
            {
              filename: 'quote-{{quote.number}}.pdf',
              url: '{{pdf.download_url}}',
            },
          ],
        },
        order: 5,
      },
      {
        id: 'notify-team',
        type: 'notify_slack',
        config: {
          channel: '#sales',
          message: '🎉 New quote sent to {{form.company}} - €{{pricing.total}}',
          includeLink: true,
        },
        order: 6,
      },
    ],
    config: {
      retryOnFailure: true,
      maxRetries: 2,
      notifyOnError: true,
      errorChannel: '#errors',
    },
  },
};
