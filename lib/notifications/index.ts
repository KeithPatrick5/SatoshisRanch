export type NotificationPayload = { event: string; recipient: string; body: string };
export interface NotificationProvider { send(payload: NotificationPayload): Promise<{ status: 'sent' | 'mocked'; id: string }>; }
export async function getNotificationProvider(): Promise<NotificationProvider> {
  if (process.env.EMAIL_PROVIDER === 'resend') return (await import('./email')).emailProvider;
  return (await import('./mock')).mockNotificationProvider;
}
