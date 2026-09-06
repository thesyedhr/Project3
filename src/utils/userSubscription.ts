export interface UserSubscription {
  userId: string;
  userName: string;
  userEmail: string;
  avatarUrl: string;
  planId: 'scale';
  planName: 'Scale';
  billingCadence: 'annual';
  billingCadenceLabel: 'Annual (Per Annum)';
  status: 'active';
  statusLabel: 'Active Paid Subscriber';
  pricePerMonth: 119;
  annualTotal: 1428;
  currency: 'USD';
  subscribedAt: string;
  renewsAt: string;
  paymentMethod: {
    brand: string;
    last4: string;
    expiry: string;
  };
  features: {
    monthlyTasksLimit: number;
    monthlyTasksUsed: number;
    activeWorkflowsLimit: string;
    activeWorkflowsCount: number;
    aiAgentConcurrency: number;
    integrationsLimit: string;
    telemetryRetentionDays: number;
    supportSla: string;
    tokensPerMonthLimit: string;
    tokensUsed: string;
    serverlessComputeLimit: string;
    serverlessComputeUsed: string;
    advancedSecurity: boolean;
    customWebhookHmac: boolean;
    dedicatedMicroVM: boolean;
  };
  invoices: Array<{
    id: string;
    date: string;
    amount: string;
    status: 'Paid';
    plan: string;
    period: string;
    pdfName: string;
  }>;
}

export const CURRENT_USER_SUBSCRIPTION: UserSubscription = {
  userId: 'usr_prince_88192a',
  userName: 'PRINCE',
  userEmail: 'itzmeshr0001@gmail.com',
  avatarUrl: 'https://res.cloudinary.com/xgii56lh/image/upload/v1788609595/noprofilepicture1.jpg',
  planId: 'scale',
  planName: 'Scale',
  billingCadence: 'annual',
  billingCadenceLabel: 'Annual (Per Annum)',
  status: 'active',
  statusLabel: 'Active Paid Subscriber',
  pricePerMonth: 119,
  annualTotal: 1428,
  currency: 'USD',
  subscribedAt: 'September 5, 2025',
  renewsAt: 'September 5, 2027',
  paymentMethod: {
    brand: 'Mastercard',
    last4: '4242',
    expiry: '11/29'
  },
  features: {
    monthlyTasksLimit: 50000,
    monthlyTasksUsed: 13600,
    activeWorkflowsLimit: 'Unlimited',
    activeWorkflowsCount: 24,
    aiAgentConcurrency: 25,
    integrationsLimit: 'Unlimited (180+ Enterprise)',
    telemetryRetentionDays: 90,
    supportSla: '24/7 Dedicated Priority SLA (< 15 mins)',
    tokensPerMonthLimit: '50M Tokens',
    tokensUsed: '8.2M Tokens',
    serverlessComputeLimit: '500 GB-s',
    serverlessComputeUsed: '380 GB-s',
    advancedSecurity: true,
    customWebhookHmac: true,
    dedicatedMicroVM: true
  },
  invoices: [
    {
      id: 'INV-2026-SCALE-002',
      date: 'Sep 5, 2026',
      amount: '$1,428.00',
      status: 'Paid',
      plan: 'Scale Plan — Annual (Per Annum)',
      period: 'Sep 5, 2026 – Sep 5, 2027',
      pdfName: 'NexaFlow-Invoice-INV-2026-SCALE-002.pdf'
    },
    {
      id: 'INV-2025-SCALE-001',
      date: 'Sep 5, 2025',
      amount: '$1,428.00',
      status: 'Paid',
      plan: 'Scale Plan — Annual (Per Annum)',
      period: 'Sep 5, 2025 – Sep 5, 2026',
      pdfName: 'NexaFlow-Invoice-INV-2025-SCALE-001.pdf'
    }
  ]
};

export const isUserPaid = (): boolean => true;
export const isScaleAnnual = (): boolean => true;
