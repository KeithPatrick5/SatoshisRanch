import type { NotificationProvider } from './index';
export const mockNotificationProvider: NotificationProvider = { async send(payload){ return { status:'mocked', id:`mock-${payload.event}-${Date.now()}` }; } };
