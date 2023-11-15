export const paths = {
  index: "/",
  auth: {
    index: "/auth",
    forgotPassword: "/auth/forgot",
    login: "/auth/login",
    register: "/auth/register",
    resetPassword: "/auth/reset-password",
    verifyCode: "/auth/verify-code",
  },
  dashboard: {
    index: "/dashboard",
    numbers: {
      index: "/dashboard/numbers",
      create: "/dashboard/numbers/create",
      details: "/dashboard/numbers/:clientId",
      edit: "/dashboard/numbers/:clientId/edit",
    },
    importNumbers: "/dashboard/import-numbers",
    sendSMS: "/dashboard/send-sms",
    smsHistory: "/dashboard/sms-history",
    paymentMethod: "/dashboard/payment-method",
  },
  admin: {
    index: "/admin",
    clients: {
      index: "/admin/clients",
      create: "/admin/clients/create",
      details: "/admin/clients/:clientId",
      edit: "/admin/clients/:clientId/edit",
    },
    smsSummary: "/admin/sms-summary",
    paymentSummary: "/admin/payment-summary",
    settings: "/admin/settings",
  },
  401: "/401",
  404: "/404",
  500: "/500",
};
