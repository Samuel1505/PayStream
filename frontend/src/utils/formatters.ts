export const formatCurrency = (amount: number, currency: string = 'STRK'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatWalletAddress = (address: string): string => {
  if (address.length <= 10) return address;
  return `${address.slice(0, 3)}...${address.slice(-3)}`;
};

export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};