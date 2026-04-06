/**
 * Formats a number into INR currency.
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount = 0) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(amount) || 0);
}

/**
 * Validates top-up amount.
 * @param {number} amount
 * @returns {{ valid: boolean, message: string }}
 */
export function validateTopUpAmount(amount) {
  if (!Number.isFinite(amount)) {
    return { valid: false, message: 'Please enter a valid amount.' };
  }

  if (amount < 5) {
    return { valid: false, message: 'Minimum top-up amount is ₹5.' };
  }

  return { valid: true, message: '' };
}

/**
 * Validates deduction amount.
 * @param {number} amount
 * @returns {{ valid: boolean, message: string }}
 */
export function validateDeductAmount(amount) {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { valid: false, message: 'Please enter a valid amount.' };
  }

  return { valid: true, message: '' };
}

/**
 * Sorts transactions latest first.
 * @param {Array<{ createdAt?: string | Date }>} transactions
 * @returns {Array}
 */
export function sortTransactionsByLatest(transactions = []) {
  return [...transactions].sort((a, b) => {
    const aTime = new Date(a.createdAt || 0).getTime();
    const bTime = new Date(b.createdAt || 0).getTime();
    return bTime - aTime;
  });
}
