'use client';

import { useState } from 'react';
import api from '@/src/lib/api';

/**
 * Hook for ban appeals.
 */
export function useAppeal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * Submit appeal for a ban.
   * @param {string} banId
   * @param {string} note
   */
  const submitAppeal = async (banId, note) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.post(`/moderation/appeal/${banId}`, { note });
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to submit appeal.');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, submitAppeal };
}
