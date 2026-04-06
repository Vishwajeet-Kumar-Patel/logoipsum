"use client";

import React, { useState } from 'react';
import { validateTopUpAmount } from '../utils/walletHelpers';

/**
 * Modal to add funds into wallet.
 * @param {{ open: boolean, loading?: boolean, onClose: () => void, onSubmit: (amount: number) => Promise<{success: boolean, message?: string}> }} props
 * @returns {JSX.Element | null}
 */
export function AddFundsModal({ open, loading = false, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const parsedAmount = Number(amount);
    const validation = validateTopUpAmount(parsedAmount);

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setError('');
    const result = await onSubmit(parsedAmount);

    if (!result?.success) {
      setError(result?.message || 'Failed to add funds.');
      return;
    }

    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Add Funds</h3>
        <p className="mt-1 text-sm text-[#5a5a5a]">Minimum top-up is ₹5.</p>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <input
            type="number"
            min="5"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full rounded-xl border border-[#e4ded2] px-4 py-2"
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-full border border-[#e4ded2] px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#f95c4b] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? 'Adding...' : 'Add Funds'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
