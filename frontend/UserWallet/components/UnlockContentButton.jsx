"use client";

import React, { useMemo, useState } from 'react';
import { useWallet } from '../hooks/useWallet';

/**
 * Unlocks premium content by deducting wallet funds.
 * @param {{ contentId: string, price: number, onUnlocked?: (contentId: string) => void }} props
 * @returns {JSX.Element}
 */
export function UnlockContentButton({ contentId, price, onUnlocked }) {
  const { deductFunds, loading } = useWallet();
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const label = useMemo(() => {
    if (unlocked) return 'Unlocked';
    if (loading) return 'Unlocking...';
    return `Unlock for ₹${Number(price).toFixed(2)}`;
  }, [loading, price, unlocked]);

  const handleUnlock = async () => {
    setError('');

    const result = await deductFunds(Number(price), contentId);

    if (!result.success) {
      setError(result.message || 'Insufficient balance. Please add funds.');
      return;
    }

    setUnlocked(true);
    onUnlocked?.(contentId);
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleUnlock}
        disabled={loading || unlocked}
        className="rounded-full bg-[#f95c4b] px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {label}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
