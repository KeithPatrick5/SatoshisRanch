export function createTotpSecretPlaceholder(userId: string){ return `totp-disabled-local-${userId}`; }
export function verifyTotpPlaceholder(code: string){ return code === '000000'; }
