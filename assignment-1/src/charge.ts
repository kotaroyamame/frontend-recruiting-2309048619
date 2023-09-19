export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: string;
  percentage?: number;
  amount?: number;
};
function isCoupon (payments: Payment[]): boolean {
  for (let i = 0; i < payments.length; i++) {
    if (payments[i].type !== 'COUPON') {
      return false;
    }
  }
  return true;
}

export function charge (invoice: Invoice, payments: Payment[]): Receipt {
  const total = invoice.total;
  let deposit = 0;
  payments = payments.sort(payment => (payment.type !== 'CASH' ? -1 : 1));
  for (const payment of payments) {
    if (payment.type === 'COUPON') {
      if (payment.percentage != null) {
        deposit += Math.floor(total * (payment.percentage / 100));
      } else {
        deposit += payment.amount || 0;
      }
    } else {
      if (deposit >= total) {
        throw new Error('OverCharge');
      }
      deposit += payment.amount || 0;
    }
  }
  if (total > deposit) {
    throw new Error('Shortage');
  }
  if (isCoupon(payments)) return { total, deposit, change: 0 };
  return { total: total, deposit: deposit, change: deposit - total };
}
