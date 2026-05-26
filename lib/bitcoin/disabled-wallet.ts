export const disabledWallet = {
  mode: 'disabled',
  async getDepositAddress(userId: string) { return `tb1qdisabled-${userId}-local-only`; },
  async broadcast() { throw new Error('disabled wallet: broadcast blocked'); }
};
