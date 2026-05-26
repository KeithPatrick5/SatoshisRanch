export function getSafetySwitches() {
  return {
    maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
    tradesEnabled: process.env.TRADES_ENABLED !== 'false',
    withdrawalsEnabled: process.env.WITHDRAWALS_ENABLED === 'true',
    mainnetWithdrawalsEnabled: process.env.MAINNET_WITHDRAWALS_ENABLED === 'true',
    mainnetBroadcastEnabled: process.env.BTC_MAINNET_BROADCAST_ENABLED === 'true',
  };
}
