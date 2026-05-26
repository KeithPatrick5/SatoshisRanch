import type { NotificationProvider } from './index';
export const telegramProvider: NotificationProvider = { async send(){ throw new Error('Telegram provider requires TELEGRAM_BOT_TOKEN and is not active in local mode.'); } };
