import type { NotificationProvider } from './index';
export const emailProvider: NotificationProvider = { async send(){ throw new Error('Email provider requires RESEND_API_KEY and is not active in local mode.'); } };
