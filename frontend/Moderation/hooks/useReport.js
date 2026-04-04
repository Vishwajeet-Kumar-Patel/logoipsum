'use client';

import { useState } from 'react';
import api from '@/src/lib/api';

/**
 * Hook for filing moderation reports.
 */
export function useReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  /**
   * File a report for a target.
   * @param {string} targetId
   * @param {'post'|'user'|'dm'} targetType
   * @param {string} reason
   * @param {string} comment
   */
  const fileReport = async (targetId, targetType, reason, comment = '') => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.post('/moderation/report', { targetId, targetType, reason, comment });
      setSuccess(true);
    } catch (err) {
      const message = err?.response?.data?.message || 'Unable to submit report.';
      setError(message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, fileReport };
}
